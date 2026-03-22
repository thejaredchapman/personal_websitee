"""Tests for the Clippy chatbot API and frontend components."""

import re


class TestApiChatSystemPrompt:
    """Test the system prompt in api/chat.js enforces Jared-only questions."""

    def test_system_prompt_exists(self, api_chat_source):
        assert "SYSTEM_PROMPT" in api_chat_source

    def test_system_prompt_identifies_as_clippy(self, api_chat_source):
        assert "Clippy" in api_chat_source
        assert "Jared Chapman" in api_chat_source

    def test_system_prompt_refuses_off_topic(self, api_chat_source):
        # Must contain instructions to refuse off-topic questions
        assert "Google" in api_chat_source or "google" in api_chat_source, (
            "System prompt should mention Google for off-topic redirects"
        )
        assert "only here" in api_chat_source.lower() or "only answer" in api_chat_source.lower(), (
            "System prompt should state Clippy only answers about Jared"
        )

    def test_system_prompt_contains_bio(self, api_chat_source):
        assert "BIO" in api_chat_source
        assert "Jared Chapman" in api_chat_source
        assert "Generative AI" in api_chat_source
        assert "Los Angeles" in api_chat_source
        assert "Atlanta" in api_chat_source

    def test_system_prompt_contains_experience(self, api_chat_source):
        assert "AbbVie" in api_chat_source
        assert "Google" in api_chat_source
        assert "Guaranteed Rate" in api_chat_source

    def test_system_prompt_contains_education(self, api_chat_source):
        assert "Georgia State University" in api_chat_source
        assert "Coursera" in api_chat_source
        assert "Multiverse" in api_chat_source

    def test_system_prompt_contains_skills(self, api_chat_source):
        for skill in ["Python", "Java", "JavaScript", "React", "GCP"]:
            assert skill in api_chat_source, (
                f"Skill '{skill}' missing from system prompt"
            )

    def test_system_prompt_contains_all_projects(self, api_chat_source):
        projects = [
            "AI Explorer",
            "LLM Frameworks",
            "DJ Master Academy",
            "LoanLens",
            "Art Portfolio",
            "DS&A Interview Prep",
            "Citizenship Pathways",
            "Chess Learning App",
            "The Daily Impact",
            "Break Into Tech",
            "Camp Javery Wedding",
            "PyTorch Interactive Guide",
        ]
        for project in projects:
            assert project in api_chat_source, (
                f"Project '{project}' missing from system prompt"
            )

    def test_system_prompt_contains_contact_info(self, api_chat_source):
        assert "thejaredchapman@gmail.com" in api_chat_source
        assert "github.com/thejaredchapman" in api_chat_source
        assert "linkedin.com" in api_chat_source

    def test_system_prompt_contains_jokes(self, api_chat_source):
        assert "dark mode" in api_chat_source.lower()
        assert "bugs" in api_chat_source.lower()

    def test_system_prompt_contains_music(self, api_chat_source):
        assert "Stevie Wonder" in api_chat_source
        assert "Sade" in api_chat_source

    def test_system_prompt_mentions_website_features(self, api_chat_source):
        assert "JaredOS" in api_chat_source
        assert "React" in api_chat_source
        assert "character themes" in api_chat_source.lower()


class TestApiChatValidation:
    """Test the API route input validation logic."""

    def test_handler_exports_default_function(self, api_chat_source):
        assert "export default async function handler" in api_chat_source

    def test_rejects_non_post(self, api_chat_source):
        assert "405" in api_chat_source
        assert "Method not allowed" in api_chat_source

    def test_requires_messages_array(self, api_chat_source):
        assert "Array.isArray(messages)" in api_chat_source

    def test_limits_message_count(self, api_chat_source):
        assert "messages.length > 20" in api_chat_source

    def test_validates_message_role(self, api_chat_source):
        assert "'user'" in api_chat_source
        assert "'assistant'" in api_chat_source

    def test_limits_content_length(self, api_chat_source):
        assert "2000" in api_chat_source

    def test_uses_anthropic_api(self, api_chat_source):
        assert "api.anthropic.com" in api_chat_source

    def test_uses_streaming(self, api_chat_source):
        assert "stream: true" in api_chat_source
        assert "text/event-stream" in api_chat_source

    def test_rate_limiting_exists(self, api_chat_source):
        assert "checkRateLimit" in api_chat_source
        assert "429" in api_chat_source

    def test_api_key_from_env(self, api_chat_source):
        assert "ANTHROPIC_API_KEY" in api_chat_source
        assert "process.env" in api_chat_source

    def test_handles_missing_api_key(self, api_chat_source):
        assert "API key not configured" in api_chat_source or "500" in api_chat_source


class TestClippyContext:
    """Test the ClippyContext state management."""

    def test_context_exists(self, clippy_context_source):
        assert "ClippyContext" in clippy_context_source

    def test_provider_exported(self, clippy_context_source):
        assert "export function ClippyProvider" in clippy_context_source

    def test_hook_exported(self, clippy_context_source):
        assert "export function useClippy" in clippy_context_source

    def test_has_messages_state(self, clippy_context_source):
        assert "messages" in clippy_context_source
        assert "setMessages" in clippy_context_source

    def test_has_loading_state(self, clippy_context_source):
        assert "isLoading" in clippy_context_source

    def test_has_send_message(self, clippy_context_source):
        assert "sendMessage" in clippy_context_source

    def test_has_clear_chat(self, clippy_context_source):
        assert "clearChat" in clippy_context_source

    def test_has_toggle_bubble(self, clippy_context_source):
        assert "toggleBubble" in clippy_context_source

    def test_has_greeting_message(self, clippy_context_source):
        assert "GREETING" in clippy_context_source
        assert "Clippy" in clippy_context_source

    def test_sends_to_api_endpoint(self, clippy_context_source):
        assert "/api/chat" in clippy_context_source

    def test_handles_streaming_response(self, clippy_context_source):
        assert "getReader" in clippy_context_source
        assert "content_block_delta" in clippy_context_source

    def test_has_abort_support(self, clippy_context_source):
        assert "AbortController" in clippy_context_source

    def test_caps_message_history(self, clippy_context_source):
        assert "20" in clippy_context_source or "slice" in clippy_context_source


class TestClippyBubble:
    """Test the floating ClippyBubble component."""

    def test_component_exists(self, clippy_bubble_source):
        assert "function ClippyBubble" in clippy_bubble_source

    def test_exported(self, clippy_bubble_source):
        assert "export default ClippyBubble" in clippy_bubble_source

    def test_uses_clippy_context(self, clippy_bubble_source):
        assert "useClippy" in clippy_bubble_source

    def test_has_expand_collapse(self, clippy_bubble_source):
        assert "toggleBubble" in clippy_bubble_source
        assert "isBubbleExpanded" in clippy_bubble_source

    def test_has_speech_tips(self, clippy_bubble_source):
        assert "CLIPPY_TIPS" in clippy_bubble_source

    def test_positioned_fixed(self, clippy_bubble_source):
        assert "fixed" in clippy_bubble_source

    def test_above_dock(self, clippy_bubble_source):
        # Should be positioned above the dock (bottom > 56px)
        assert "bottom-[72px]" in clippy_bubble_source or "bottom-[64px]" in clippy_bubble_source

    def test_mobile_responsive(self, clippy_bubble_source):
        assert "max-[768px]" in clippy_bubble_source

    def test_auto_collapses_when_window_open(self, clippy_bubble_source):
        assert "clippyWindowOpen" in clippy_bubble_source

    def test_has_input_field(self, clippy_bubble_source):
        assert "<input" in clippy_bubble_source

    def test_has_send_button(self, clippy_bubble_source):
        assert "handleSend" in clippy_bubble_source

    def test_uses_clippy_character(self, clippy_bubble_source):
        assert "ClippyCharacter" in clippy_bubble_source


class TestClippyApp:
    """Test the full ClippyApp chat window."""

    def test_component_exists(self, clippy_app_source):
        assert "function ClippyApp" in clippy_app_source

    def test_exported(self, clippy_app_source):
        assert "export default ClippyApp" in clippy_app_source

    def test_uses_clippy_context(self, clippy_app_source):
        assert "useClippy" in clippy_app_source

    def test_has_suggestion_chips(self, clippy_app_source):
        assert "SUGGESTIONS" in clippy_app_source

    def test_suggestion_topics(self, clippy_app_source):
        assert "skills" in clippy_app_source.lower()
        assert "projects" in clippy_app_source.lower()
        assert "joke" in clippy_app_source.lower()

    def test_has_clear_chat_button(self, clippy_app_source):
        assert "clearChat" in clippy_app_source

    def test_has_input_field(self, clippy_app_source):
        assert "<input" in clippy_app_source
        assert "handleSend" in clippy_app_source

    def test_has_typing_indicator(self, clippy_app_source):
        assert "typingDots" in clippy_app_source

    def test_renders_user_messages_right_aligned(self, clippy_app_source):
        assert "justify-end" in clippy_app_source

    def test_renders_assistant_messages_left_aligned(self, clippy_app_source):
        assert "justify-start" in clippy_app_source

    def test_auto_scrolls_to_bottom(self, clippy_app_source):
        assert "scrollIntoView" in clippy_app_source

    def test_handles_enter_key(self, clippy_app_source):
        assert "Enter" in clippy_app_source

    def test_uses_clippy_character(self, clippy_app_source):
        assert "ClippyCharacter" in clippy_app_source

    def test_renders_markdown_content(self, clippy_app_source):
        assert "renderContent" in clippy_app_source

    def test_markdown_supports_bold(self, clippy_app_source):
        assert "**" in clippy_app_source or "bold" in clippy_app_source.lower()

    def test_markdown_supports_links(self, clippy_app_source):
        assert "href" in clippy_app_source
        assert "target" in clippy_app_source


class TestClippyIntegration:
    """Test Clippy is properly wired into the app."""

    def test_main_has_clippy_provider(self, main_jsx_source):
        assert "ClippyProvider" in main_jsx_source

    def test_app_has_clippy_bubble(self, app_jsx_source):
        assert "ClippyBubble" in app_jsx_source

    def test_desktop_has_clippy_app(self, desktop_source):
        assert "ClippyApp" in desktop_source
        assert "clippy: ClippyApp" in desktop_source

    def test_dock_has_clippy_icon(self, dock_source):
        assert "'clippy'" in dock_source or '"clippy"' in dock_source
        assert "Ask Clippy" in dock_source

    def test_window_config_has_clippy(self, window_context_source):
        assert "clippy:" in window_context_source
        assert "Ask Clippy" in window_context_source
