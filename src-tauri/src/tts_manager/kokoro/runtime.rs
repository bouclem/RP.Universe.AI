use std::path::PathBuf;
use std::{env, process::Command};

use tauri::AppHandle;

use super::model::KokoroError;
use super::phonemizer::EspeakConfig;

pub fn resolve_espeak_config(
    app: &AppHandle,
    requested_bin_path: Option<PathBuf>,
    requested_data_path: Option<PathBuf>,
) -> Result<EspeakConfig, KokoroError> {
    if let Some(config) = explicit_espeak_config(requested_bin_path, requested_data_path)? {
        return Ok(config);
    }

    let _ = app;
    resolve_desktop_espeak()
}

fn explicit_espeak_config(
    requested_bin_path: Option<PathBuf>,
    requested_data_path: Option<PathBuf>,
) -> Result<Option<EspeakConfig>, KokoroError> {
    let Some(bin_path) = requested_bin_path else {
        return Ok(None);
    };

    if !bin_path.is_file() {
        return Err(KokoroError::Config(format!(
            "Configured eSpeak NG binary does not exist: {}",
            bin_path.display()
        )));
    }

    let data_path = match requested_data_path {
        Some(path) if path.is_dir() => Some(path),
        Some(path) => {
            return Err(KokoroError::Config(format!(
                "Configured eSpeak NG data path does not exist: {}",
                path.display()
            )));
        }
        None => None,
    };

    Ok(Some(EspeakConfig {
        bin_path: Some(bin_path),
        data_path,
    }))
}

fn resolve_desktop_espeak() -> Result<EspeakConfig, KokoroError> {
    if command_available("espeak-ng") {
        return Ok(EspeakConfig::default());
    }

    Err(KokoroError::EspeakUnavailable(espeak_install_guide()))
}

fn command_available(command: &str) -> bool {
    Command::new(command)
        .arg("--version")
        .output()
        .map(|output| output.status.success())
        .unwrap_or(false)
}

fn espeak_install_guide() -> String {
    let install = match env::consts::OS {
        "windows" => "Install eSpeak NG, then restart the app:\n\nwinget install eSpeak-NG.eSpeak-NG",
        "macos" => "Install eSpeak NG, then restart the app:\n\nbrew install espeak-ng",
        "linux" => {
            "Install eSpeak NG with your distro package manager, then restart the app:\n\nUbuntu/Debian: sudo apt install espeak-ng\nFedora: sudo dnf install espeak-ng\nArch: sudo pacman -S espeak-ng"
        }
        _ => "Install eSpeak NG, make sure `espeak-ng` is on PATH, then restart the app.",
    };

    format!(
        "Kokoro requires eSpeak NG for phonemization, but `espeak-ng` was not found.\n\n{install}\n\nGuide: https://github.com/espeak-ng/espeak-ng"
    )
}

