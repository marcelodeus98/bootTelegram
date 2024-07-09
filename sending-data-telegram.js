const TelegramBot = require('node-telegram-bot-api');
const sequelize = require('./db/database');
const Cliente = require('./NewClients/Clientes');

// Config of bot Telegram
const telegramToken = 'TOKEN_TELEGRAM';
const chatId = 'CHAT_ID';

// Connect to telegram bot
const bot = new TelegramBot(telegramToken, { polling: true});

// Manipulador de eventos de mensagens do Telegram
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Bot iniciado. Aguardando novas inserções no banco de dados');
});

// Synchronize the model with and init checking for new insertions
(async () => {
        await sequelize.sync();

        // Verificar novas inserções a cada 5000 milissegundos
        setInterval(checkDatabase, 5000);
})();

// Function to check new insertions into the database
async function checkDatabase(){
    const newInformations = await Cliente.findAll({
        where: {
            status: 0 // Buscar apenas entradas não processadas 
        }
    });

    if(newInformations.length > 0){
        newInformations.forEach(async (cliente) => {
            let clienteInfor = {
                fname: cliente.fname,
                sname: cliente.sname,
                email: cliente.email,
                contact: cliente.contact,
                andress: cliente.andress
            };
            
            let message = `Novo lead inserido:\n 
                            Primeiro nome: ${clienteInfor.fname}\n 
                            Sobrenome: ${clienteInfor.sname}\n
                            Email:${clienteInfor.email}\n
                            Contato:${clienteInfor.contact}\n
                            Endereço:${clienteInfor.andress}`/

            // Submit message                
            bot.sendMessage(chatId, message);
        
        // Marcar a informação como processada para evitar enviar novamente
        await cliente.update({ status: 1 }); 
        });
    };
};