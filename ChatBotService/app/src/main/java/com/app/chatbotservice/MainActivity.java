package com.app.chatbotservice;

import android.content.Intent;
import android.content.res.AssetManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;

public class MainActivity extends AppCompatActivity {

    public static String KEY_API_BOT_TELEGRAM = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        KEY_API_BOT_TELEGRAM = getEnviron("API_TOKEN_BOT");

        TextView view = new TextView(this);
        view.setText("Hello, Android");
        setContentView(view);

        // TODO: Ativação do serviço deve ser realizado por um botão.
        Intent intent = new Intent(MainActivity.this, ApiResponseService.class);
        startService(intent);
    }

    private String getEnviron(String key){
        HashMap<String, String> dict = new HashMap<String, String>();
        try{
            AssetManager assetManager = getResources().getAssets();
            InputStream inputStream = assetManager.open("credentials.env");
            InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
            BufferedReader br = new BufferedReader(inputStreamReader);
            while(br.ready()){
                String linha = br.readLine();
                String[] split = linha.split("=");
                dict.put(new String(split[0]).trim(), new String(split[1]).trim());
            }
            br.close();
        }catch (IOException e) {
            Log.d("CATCH",e.getMessage());
        }
        return dict.get(key);
    }
}
