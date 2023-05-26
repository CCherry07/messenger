// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![set_user_language])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn set_user_language(language: &str, window: tauri::Window) -> bool {
    // 控制访问 地址 http://localhost:3000/zh-CN
    println!("set_user_language: {}", language);
    return true;
}
