//! Gathered from inline tests in src/providers/util.rs.

use rp_universe_ai_lib::chat_manager::types::ProviderId;
use rp_universe_ai_lib::providers::util::build_headers;
use reqwest::header::{HeaderValue, AUTHORIZATION};

#[test]
fn featherless_uses_standard_authorization_header() {
    let headers = build_headers(&ProviderId("featherless".into()), "test-key").unwrap();

    assert_eq!(
        headers.get(AUTHORIZATION).unwrap(),
        &HeaderValue::from_static("Bearer test-key")
    );
    assert!(headers.get("authentication").is_none());
}
