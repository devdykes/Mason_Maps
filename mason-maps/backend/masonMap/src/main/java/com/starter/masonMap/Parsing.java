package com.starter.masonMap;


    import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Parsing {

    public static String getGeminiResponse(String prompt) throws IOException {
        String apiKey = "AIzaSyD4EeiZ44V_ufZ_pqHoha9959R1j52a72c";  // 🔐 Replace with your Gemini API key
        String endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;
        prompt= prompt+"from the parsed text, find the meeting times of each class, categorize them by the day they meet, then get the longitude and latitude of the location where each class is held and return the data in a easy to pasre format, only give the data no other response not json format but comma separated values";
        prompt+="Day,Course,Time,Building,Room,Latitude,Longitude. Enssure it fits that format and have every new course separated by an an underscore. If the class meets on two days show both  as same class with space between the days. For example: Monday Wednesday,Course,Time,Building,Room,Latitude,Longitude_Thursday,Course,Time,Building,Room,Latitude,Longitude";
        String jsonInput = """
            {
              "contents": [
                {
                  "parts": [
                    {
                      "text": "%s"
                    }
                  ]
                }
              ]
            }
            """.formatted(prompt);

        URL url = new URL(endpoint);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);

        try (OutputStream os = conn.getOutputStream()) {
            os.write(jsonInput.getBytes(StandardCharsets.UTF_8));
        }

        StringBuilder response = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(conn.getInputStream(), StandardCharsets.UTF_8))) {
            String line;
            while ((line = reader.readLine()) != null) {
                response.append(line);
            }
        }

        return extractTextFromGeminiResponse(response.toString()); // returns raw JSON response


    }/*!SECTION
    { "candidates": [ { "content": { "parts": [ { "text": "Test test 1234\n" } ], "role": "model" }, "finishReason": "STOP", "avgLogprobs": -1.5325553249567747e-05 } ], "usageMetadata": { "promptTokenCount": 11, "candidatesTokenCount": 8, "totalTokenCount": 19, "promptTokensDetails": [ { "modality": "TEXT", "tokenCount": 11 } ], "candidatesTokensDetails": [ { "modality": "TEXT", "tokenCount": 8 } ] }, "modelVersion": "gemini-2.0-flash"}
    
    */
    public static String extractTextFromGeminiResponse(String jsonResponse) {
        // Regular expression to match the "text" value inside the JSON structure
        String regex = "\"text\"\\s*:\\s*\"([^\"]+)\"";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(jsonResponse);
        
        if (matcher.find()) {
            // Return the captured text (the content inside the quotes after "text")
            return (matcher.group(1).replace("\\n",""));
        }
        
        return "";
        
    }
}
