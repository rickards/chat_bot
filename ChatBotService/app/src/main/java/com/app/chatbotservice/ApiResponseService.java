package com.app.chatbotservice;

import android.app.IntentService;
import android.content.Intent;
import android.content.Context;
import android.util.Log;
import android.widget.TextView;

import com.pengrad.telegrambot.TelegramBot;
import com.pengrad.telegrambot.TelegramBotAdapter;
import com.pengrad.telegrambot.UpdatesListener;
import com.pengrad.telegrambot.model.Update;
import com.pengrad.telegrambot.model.request.ChatAction;
import com.pengrad.telegrambot.request.GetUpdates;
import com.pengrad.telegrambot.request.SendChatAction;
import com.pengrad.telegrambot.request.SendMessage;
import com.pengrad.telegrambot.response.BaseResponse;
import com.pengrad.telegrambot.response.GetUpdatesResponse;
import com.pengrad.telegrambot.response.SendResponse;

import java.util.List;

/**
 * An {@link IntentService} subclass for handling asynchronous task requests in
 * a service on a separate handler thread.
 * <p>
 * TODO: Customize class - update intent actions, extra parameters and static
 * helper methods.
 */
public class ApiResponseService extends IntentService {

    /**
     * A constructor is required, and must call the super IntentService(String)
     * constructor with a name for the worker thread.
     */
    public ApiResponseService() {
        super("HelloIntentService");
    }

    /**
     * The IntentService calls this method from the default worker thread with
     * the intent that started the service. When this method returns, IntentService
     * stops the service, as appropriate.nu
     */
    @Override
    protected void onHandleIntent(Intent intent) {

        // Create your bot passing the token received from @BotFather
        Log.d("BOTFFATHER", MainActivity.KEY_API_BOT_TELEGRAM);
        TelegramBot bot = new TelegramBot(MainActivity.KEY_API_BOT_TELEGRAM);
        //objeto responsável por receber as mensagens
        GetUpdatesResponse updatesResponse;
        //objeto responsável por gerenciar o envio de respostas
        SendResponse sendResponse;
        //objeto responsável por gerenciar o envio de ações do chat
        BaseResponse baseResponse;

        //controle de off-set, isto é, a partir deste ID será lido as mensagens pendentes na fila
        int m=0;


        try {
            while (true){
                Thread.sleep(10000);
                Log.d("COUNT", "oi");


                //executa comando no Telegram para obter as mensagens pendentes a partir de um off-set (limite inicial)
                updatesResponse =  bot.execute(new GetUpdates().limit(100).offset(m));

                //lista de mensagens
                List<Update> updates = updatesResponse.updates();
                if (updates == null){
                    continue;
                }

                //análise de cada ação da mensagem
                for (Update update : updates) {

                    //atualização do off-set
                    m = update.updateId()+1;
                    Log.d("UPDATE", update.toString());

                    if (update.channelPost() != null){
                        continue;
                    }

                    Log.d("Recebendo mensagem:", update.message().text());

                    //envio de "Escrevendo" antes de enviar a resposta
                    baseResponse = bot.execute(new SendChatAction(update.message().chat().id(), ChatAction.typing.name()));
                    //verificação de ação de chat foi enviada com sucesso
                    Log.d("RespostaAction Enviada?", baseResponse.isOk()+"");

                    //envio da mensagem de resposta
                    sendResponse = bot.execute(new SendMessage(update.message().chat().id(),"Meu criador está me ensinando, logo saberei respondê-lo..."));
                    //verificação de mensagem enviada com sucesso
                    Log.d("Mensagem Enviada?", sendResponse.isOk()+"");

                }
            }

        } catch (InterruptedException e) {
            // Restore interrupt status.
            Thread.currentThread().interrupt();
        }
    }
}

