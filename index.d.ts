/// <reference types="node" />
import { EventEmitter } from "node:events";

export type PacketName =
  | "add_behavior_tree"
  | "add_entity"
  | "add_item_entity"
  | "add_painting"
  | "add_player"
  | "add_volume_entity"
  | "adventure_settings"
  | "agent_action"
  | "agent_animation"
  | "animate"
  | "animate_entity"
  | "anvil_damage"
  | "available_commands"
  | "available_entity_identifiers"
  | "award_achievement"
  | "biome_definition_list"
  | "block_entity_data"
  | "block_event"
  | "block_pick_request"
  | "book_edit"
  | "boss_event"
  | "camera"
  | "camera_aim_assist"
  | "camera_aim_assist_actor_priority"
  | "camera_aim_assist_presets"
  | "camera_instruction"
  | "camera_presets"
  | "camera_shake"
  | "camera_spline"
  | "change_dimension"
  | "change_mob_property"
  | "chunk_radius_update"
  | "client_cache_blob_status"
  | "client_cache_miss_response"
  | "client_cache_status"
  | "client_camera_aim_assist"
  | "client_cheat_ability"
  | "client_movement_prediction_sync"
  | "client_start_item_cooldown"
  | "client_to_server_handshake"
  | "clientbound_attribute_layer_sync"
  | "clientbound_close_form"
  | "clientbound_controls_scheme"
  | "clientbound_data_driven_ui_close_screen"
  | "clientbound_data_driven_ui_reload"
  | "clientbound_data_driven_ui_show_screen"
  | "clientbound_data_store"
  | "clientbound_map_item_data"
  | "clientbound_texture_shift"
  | "clientbound_update_sound_data"
  | "code_builder"
  | "code_builder_source"
  | "command_block_update"
  | "command_output"
  | "command_request"
  | "completed_using_item"
  | "compressed_biome_definitions"
  | "container_close"
  | "container_open"
  | "container_registry_cleanup"
  | "container_set_data"
  | "correct_player_move_prediction"
  | "crafting_data"
  | "crafting_event"
  | "create_photo"
  | "creative_content"
  | "current_structure_feature"
  | "death_info"
  | "debug_info"
  | "dimension_data"
  | "disconnect"
  | "editor_network"
  | "edu_uri_resource_packet"
  | "education_settings"
  | "emote"
  | "emote_list"
  | "entity_event"
  | "entity_pick_request"
  | "event"
  | "feature_registry"
  | "filter_text_packet"
  | "game_rules_changed"
  | "game_test_request"
  | "game_test_results"
  | "graphics_override_parameter"
  | "gui_data_pick_item"
  | "hurt_armor"
  | "initiate_web_socket_connection"
  | "interact"
  | "inventory_content"
  | "inventory_slot"
  | "inventory_transaction"
  | "item_registry"
  | "item_stack_request"
  | "item_stack_response"
  | "jigsaw_structure_data"
  | "lab_table"
  | "lectern_update"
  | "lesson_progress"
  | "level_chunk"
  | "level_event"
  | "level_event_generic"
  | "level_sound_event"
  | "level_sound_event_old"
  | "level_sound_event_v2"
  | "locator_bar"
  | "login"
  | "map_create_locked_copy"
  | "map_info_request"
  | "mob_armor_equipment"
  | "mob_effect"
  | "mob_equipment"
  | "modal_form_request"
  | "modal_form_response"
  | "motion_prediction_hints"
  | "move_entity"
  | "move_entity_delta"
  | "move_player"
  | "movement_effect"
  | "multiplayer_settings"
  | "network_chunk_publisher_update"
  | "network_settings"
  | "network_stack_latency"
  | "npc_dialogue"
  | "npc_request"
  | "on_screen_texture_animation"
  | "open_sign"
  | "packet_violation_warning"
  | "party_changed"
  | "party_destination_cookie_response"
  | "photo_info_request"
  | "photo_transfer"
  | "play_sound"
  | "play_status"
  | "player_action"
  | "player_armor_damage"
  | "player_auth_input"
  | "player_enchant_options"
  | "player_fog"
  | "player_hotbar"
  | "player_input"
  | "player_list"
  | "player_location"
  | "player_skin"
  | "player_update_entity_overrides"
  | "player_video_capture"
  | "position_tracking_db_broadcast"
  | "position_tracking_db_request"
  | "primitive_shapes"
  | "purchase_receipt"
  | "refresh_entitlements"
  | "remove_entity"
  | "remove_objective"
  | "remove_volume_entity"
  | "request_ability"
  | "request_chunk_radius"
  | "request_network_settings"
  | "request_permissions"
  | "resource_pack_chunk_data"
  | "resource_pack_chunk_request"
  | "resource_pack_client_response"
  | "resource_pack_data_info"
  | "resource_pack_stack"
  | "resource_packs_info"
  | "resource_packs_ready_for_validation"
  | "respawn"
  | "rider_jump"
  | "script_custom_event"
  | "script_message"
  | "send_party_destination_cookie"
  | "server_post_move"
  | "server_presence_info"
  | "server_script_debug_drawer"
  | "server_settings_request"
  | "server_settings_response"
  | "server_stats"
  | "server_store_info"
  | "server_to_client_handshake"
  | "serverbound_data_driven_screen_closed"
  | "serverbound_data_store"
  | "serverbound_diagnostics"
  | "serverbound_loading_screen"
  | "serverbound_pack_setting_change"
  | "set_commands_enabled"
  | "set_default_game_type"
  | "set_difficulty"
  | "set_display_objective"
  | "set_entity_data"
  | "set_entity_link"
  | "set_entity_motion"
  | "set_health"
  | "set_hud"
  | "set_last_hurt_by"
  | "set_local_player_as_initialized"
  | "set_movement_authority"
  | "set_player_game_type"
  | "set_player_inventory_options"
  | "set_score"
  | "set_scoreboard_identity"
  | "set_spawn_position"
  | "set_time"
  | "set_title"
  | "settings_command"
  | "show_credits"
  | "show_profile"
  | "show_store_offer"
  | "simple_event"
  | "simulation_type"
  | "spawn_experience_orb"
  | "spawn_particle_effect"
  | "start_game"
  | "stop_sound"
  | "structure_block_update"
  | "structure_template_data_export_request"
  | "structure_template_data_export_response"
  | "sub_client_login"
  | "subchunk"
  | "subchunk_request"
  | "sync_entity_property"
  | "sync_world_clocks"
  | "take_item_entity"
  | "text"
  | "tick_sync"
  | "ticking_areas_load_status"
  | "toast_request"
  | "toggle_crafter_slot_request"
  | "transfer"
  | "trim_data"
  | "unlocked_recipes"
  | "update_abilities"
  | "update_adventure_settings"
  | "update_attributes"
  | "update_block"
  | "update_block_properties"
  | "update_block_synced"
  | "update_client_input_locks"
  | "update_client_options"
  | "update_equipment"
  | "update_player_game_type"
  | "update_soft_enum"
  | "update_subchunk_blocks"
  | "update_trade"
  | "video_stream_connect"
  | "voxel_shapes";

export interface PacketFields {
  "add_behavior_tree": {
    "behaviortree"?: string;
  };
  "add_entity": {
    "unique_id"?: bigint;
    "runtime_id"?: unknown;
    "entity_type"?: string;
    "position"?: unknown;
    "velocity"?: unknown;
    "pitch"?: number;
    "yaw"?: number;
    "head_yaw"?: number;
    "body_yaw"?: number;
    "attributes"?: unknown;
    "metadata"?: unknown;
    "properties"?: unknown;
    "links"?: unknown;
  };
  "add_item_entity": {
    "entity_id_self"?: bigint;
    "runtime_entity_id"?: unknown;
    "item"?: unknown;
    "position"?: unknown;
    "velocity"?: unknown;
    "metadata"?: unknown;
    "is_from_fishing"?: boolean;
  };
  "add_painting": {
    "entity_id_self"?: bigint;
    "runtime_entity_id"?: unknown;
    "coordinates"?: unknown;
    "direction"?: number;
    "title"?: string;
  };
  "add_player": {
    "uuid"?: unknown;
    "username"?: string;
    "runtime_id"?: unknown;
    "platform_chat_id"?: string;
    "position"?: unknown;
    "velocity"?: unknown;
    "pitch"?: number;
    "yaw"?: number;
    "head_yaw"?: number;
    "held_item"?: unknown;
    "gamemode"?: unknown;
    "metadata"?: unknown;
    "properties"?: unknown;
    "unique_id"?: bigint;
    "permission_level"?: unknown;
    "command_permission"?: unknown;
    "abilities"?: Array<unknown>;
    "links"?: unknown;
    "device_id"?: string;
    "device_os"?: unknown;
  };
  "add_volume_entity": {
    "runtime_id"?: unknown;
    "nbt"?: unknown;
    "encoding_identifier"?: string;
    "instance_name"?: string;
    "bounds"?: { "min"?: unknown; "max"?: unknown };
    "dimension"?: number;
    "engine_version"?: string;
  };
  "adventure_settings": {
    "flags"?: unknown;
    "command_permission"?: unknown;
    "action_permissions"?: unknown;
    "permission_level"?: unknown;
    "custom_stored_permissions"?: number;
    "user_id"?: bigint;
  };
  "agent_action": {
    "request_id"?: string;
    "action_type"?: unknown;
    "body"?: string;
  };
  "agent_animation": {
    "animation"?: unknown;
    "entity_runtime_id"?: unknown;
  };
  "animate": {
    "action_id"?: unknown;
    "runtime_entity_id"?: unknown;
    "data"?: number;
    "has_swing_source"?: boolean;
    "swing_source"?: unknown;
  };
  "animate_entity": {
    "animation"?: string;
    "next_state"?: string;
    "stop_condition"?: string;
    "stop_condition_version"?: number;
    "controller"?: string;
    "blend_out_time"?: number;
    "runtime_entity_ids"?: Array<unknown>;
  };
  "anvil_damage": {
    "position"?: unknown;
  };
  "available_commands": {
    "values_len"?: number;
    "enum_values"?: Array<string>;
    "chained_subcommand_values"?: Array<string>;
    "suffixes"?: Array<string>;
    "enums"?: Array<{ "name"?: string; "values"?: Array<unknown> }>;
    "chained_subcommands"?: Array<{ "name"?: string; "values"?: Array<{ "index"?: number; "value"?: number }> }>;
    "command_data"?: Array<{ "name"?: string; "description"?: string; "flags"?: unknown; "permission_level"?: string; "alias"?: number; "chained_subcommand_offsets"?: Array<unknown>; "overloads"?: Array<{ "chaining"?: boolean; "parameters"?: Array<{ "parameter_name"?: string; "value_type"?: unknown; "enum_type"?: unknown; "optional"?: boolean; "options"?: unknown }> }> }>;
    "dynamic_enums"?: Array<{ "name"?: string; "values"?: Array<string> }>;
    "enum_constraints"?: Array<{ "value_index"?: number; "enum_index"?: number; "constraints"?: Array<{ "constraint"?: unknown }> }>;
  };
  "available_entity_identifiers": {
    "nbt"?: unknown;
  };
  "award_achievement": {
    "achievement_id"?: number;
  };
  "biome_definition_list": {
    "biome_definitions"?: Array<unknown>;
    "string_list"?: Array<string>;
  };
  "block_entity_data": {
    "position"?: unknown;
    "nbt"?: unknown;
  };
  "block_event": {
    "position"?: unknown;
    "type"?: unknown;
    "data"?: number;
  };
  "block_pick_request": {
    "x"?: number;
    "y"?: number;
    "z"?: number;
    "add_user_data"?: boolean;
    "selected_slot"?: number;
  };
  "book_edit": {
    "inventory_slot"?: number;
    "type"?: unknown;
  };
  "boss_event": {
    "target_entity_id"?: bigint;
    "player_id"?: bigint;
    "type"?: unknown;
    "title"?: string;
    "filtered_title"?: string;
    "progress"?: number;
    "color"?: unknown;
    "overlay"?: unknown;
  };
  "camera": {
    "camera_entity_unique_id"?: bigint;
    "target_player_unique_id"?: bigint;
  };
  "camera_aim_assist": {
    "preset_id"?: string;
    "view_angle"?: unknown;
    "distance"?: number;
    "target_mode"?: unknown;
    "action"?: unknown;
    "show_debug_render"?: boolean;
  };
  "camera_aim_assist_actor_priority": {
    "priority_data"?: Array<unknown>;
  };
  "camera_aim_assist_presets": {
    "categories"?: Array<{ "name"?: string; "entity_priorities"?: Array<{ "id"?: string; "priority"?: number }>; "block_priorities"?: Array<{ "id"?: string; "priority"?: number }>; "block_tags"?: Array<number>; "entity_type_families"?: Array<{ "id"?: string; "priority"?: number }>; "entity_default"?: unknown; "block_default"?: unknown }>;
    "presets"?: Array<{ "id"?: string; "exclusion_settings"?: { "blocks"?: Array<string>; "entities"?: Array<string>; "block_tags"?: Array<string>; "entity_type_families"?: Array<string> }; "target_liquids"?: Array<string>; "item_settings"?: Array<{ "id"?: string; "category"?: string }>; "default_item_settings"?: unknown; "hand_settings"?: unknown }>;
    "operation"?: unknown;
  };
  "camera_instruction": {
    "instruction_set"?: unknown;
    "clear"?: unknown;
    "fade"?: unknown;
    "target"?: unknown;
    "remove_target"?: unknown;
    "fov"?: unknown;
    "spline"?: unknown;
    "attach_to_entity"?: unknown;
    "detach_from_entity"?: unknown;
  };
  "camera_presets": {
    "presets"?: Array<unknown>;
  };
  "camera_shake": {
    "intensity"?: number;
    "duration"?: number;
    "type"?: number;
    "action"?: unknown;
  };
  "camera_spline": {
    "splines"?: Array<unknown>;
  };
  "change_dimension": {
    "dimension"?: number;
    "position"?: unknown;
    "respawn"?: boolean;
    "loading_screen_id"?: unknown;
  };
  "change_mob_property": {
    "entity_unique_id"?: bigint;
    "property"?: string;
    "bool_value"?: boolean;
    "string_value"?: string;
    "int_value"?: number;
    "float_value"?: number;
  };
  "chunk_radius_update": {
    "chunk_radius"?: number;
  };
  "client_cache_blob_status": {
    "missing"?: Array<unknown>;
    "have"?: Array<unknown>;
  };
  "client_cache_miss_response": {
    "blobs"?: Array<unknown>;
  };
  "client_cache_status": {
    "enabled"?: boolean;
  };
  "client_camera_aim_assist": {
    "preset_id"?: string;
    "action"?: unknown;
    "allow_aim_assist"?: boolean;
  };
  "client_cheat_ability": {
    "entity_unique_id"?: bigint;
    "permission_level"?: unknown;
    "command_permission"?: unknown;
    "abilities"?: Array<unknown>;
  };
  "client_movement_prediction_sync": {
    "data_flags"?: unknown;
    "bounding_box"?: { "scale"?: number; "width"?: number; "height"?: number };
    "movement_speed"?: number;
    "underwater_movement_speed"?: number;
    "lava_movement_speed"?: number;
    "jump_strength"?: number;
    "health"?: number;
    "hunger"?: number;
    "unknown_attribute_1"?: number;
    "unknown_attribute_2"?: number;
    "unknown_attribute_3"?: number;
    "entity_runtime_id"?: unknown;
    "is_flying"?: boolean;
  };
  "client_start_item_cooldown": {
    "category"?: string;
    "duration"?: number;
  };
  "client_to_server_handshake": {
  };
  "clientbound_attribute_layer_sync": {
    "payload_type"?: unknown;
  };
  "clientbound_close_form": {
  };
  "clientbound_controls_scheme": {
    "scheme"?: unknown;
  };
  "clientbound_data_driven_ui_close_screen": {
    "form_id"?: unknown;
  };
  "clientbound_data_driven_ui_reload": {
  };
  "clientbound_data_driven_ui_show_screen": {
    "screen_id"?: string;
    "form_id"?: unknown;
    "data_instance_id"?: unknown;
  };
  "clientbound_data_store": {
    "updates"?: Array<unknown>;
  };
  "clientbound_map_item_data": {
    "map_id"?: bigint;
    "dimension"?: number;
    "locked"?: boolean;
    "origin"?: unknown;
    "included_in"?: unknown;
    "scale"?: unknown;
    "tracked_objects"?: unknown;
    "decorations"?: unknown;
    "width"?: unknown;
    "height"?: unknown;
    "x_offset"?: unknown;
    "y_offset"?: unknown;
    "pixels"?: unknown;
  };
  "clientbound_texture_shift": {
    "action"?: unknown;
    "collection_name"?: string;
    "from_step"?: string;
    "to_step"?: string;
    "all_steps"?: Array<string>;
    "current_length_ticks"?: unknown;
    "total_length_ticks"?: unknown;
    "enabled"?: boolean;
  };
  "clientbound_update_sound_data": {
    "server_sound_handle"?: unknown;
    "stop"?: unknown;
    "volume"?: unknown;
    "pitch"?: unknown;
    "fade"?: unknown;
    "seek_to"?: unknown;
    "pause"?: unknown;
    "resume"?: unknown;
  };
  "code_builder": {
    "url"?: string;
    "should_open_code_builder"?: boolean;
  };
  "code_builder_source": {
    "operation"?: unknown;
    "category"?: unknown;
    "code_status"?: unknown;
  };
  "command_block_update": {
    "is_block"?: boolean;
    "command"?: string;
    "last_output"?: string;
    "name"?: string;
    "filtered_name"?: string;
    "should_track_output"?: boolean;
    "tick_delay"?: number;
    "execute_on_first_tick"?: boolean;
  };
  "command_output": {
    "origin"?: unknown;
    "output_type"?: string;
    "success_count"?: unknown;
    "output"?: Array<{ "message_id"?: string; "success"?: boolean; "parameters"?: Array<string> }>;
    "has_data"?: boolean;
    "data"?: unknown;
  };
  "command_request": {
    "command"?: string;
    "origin"?: unknown;
    "internal"?: boolean;
    "version"?: string;
  };
  "completed_using_item": {
    "used_item_id"?: number;
    "use_method"?: unknown;
  };
  "compressed_biome_definitions": {
    "raw_payload"?: Buffer;
  };
  "container_close": {
    "window_id"?: unknown;
    "window_type"?: unknown;
    "server"?: boolean;
  };
  "container_open": {
    "window_id"?: unknown;
    "window_type"?: unknown;
    "coordinates"?: unknown;
    "runtime_entity_id"?: bigint;
  };
  "container_registry_cleanup": {
    "removed_containers"?: Array<unknown>;
  };
  "container_set_data": {
    "window_id"?: unknown;
    "property"?: number;
    "value"?: number;
  };
  "correct_player_move_prediction": {
    "prediction_type"?: unknown;
    "position"?: unknown;
    "delta"?: unknown;
    "rotation"?: unknown;
    "angular_velocity"?: unknown;
    "on_ground"?: boolean;
    "tick"?: unknown;
  };
  "crafting_data": {
    "shaped_recipes"?: Array<unknown>;
    "shapeless_recipes"?: Array<unknown>;
    "multi_recipes"?: Array<unknown>;
    "shulker_box_recipes"?: Array<unknown>;
    "shapeless_chemistry_recipes"?: Array<unknown>;
    "shaped_chemistry_recipes"?: Array<unknown>;
    "smithing_transform_recipes"?: Array<unknown>;
    "smithing_trim_recipes"?: Array<unknown>;
    "potion_type_recipes"?: unknown;
    "potion_container_recipes"?: unknown;
    "material_reducers"?: Array<unknown>;
    "clear_recipes"?: boolean;
  };
  "crafting_event": {
    "window_id"?: unknown;
    "recipe_type"?: unknown;
    "recipe_id"?: unknown;
    "input"?: Array<unknown>;
    "result"?: Array<unknown>;
  };
  "create_photo": {
    "entity_unique_id"?: bigint;
    "photo_name"?: string;
    "item_name"?: string;
  };
  "creative_content": {
    "groups"?: Array<{ "category"?: unknown; "name"?: string; "icon_item"?: unknown }>;
    "items"?: Array<{ "entry_id"?: number; "item"?: unknown; "group_index"?: number }>;
  };
  "current_structure_feature": {
    "current_feature"?: string;
  };
  "death_info": {
    "cause"?: string;
    "messages"?: Array<string>;
  };
  "debug_info": {
    "player_unique_id"?: bigint;
    "data"?: Buffer;
  };
  "dimension_data": {
    "definitions"?: Array<{ "id"?: string; "max_height"?: number; "min_height"?: number; "generator"?: unknown; "dimension_type"?: number; "pack_id"?: unknown }>;
  };
  "disconnect": {
    "reason"?: unknown;
    "hide_disconnect_reason"?: boolean;
  };
  "editor_network": {
    "route_to_manager"?: boolean;
    "payload"?: unknown;
  };
  "edu_uri_resource_packet": {
    "resource"?: unknown;
  };
  "education_settings": {
    "CodeBuilderDefaultURI"?: string;
    "CodeBuilderTitle"?: string;
    "CanResizeCodeBuilder"?: boolean;
    "disable_legacy_title_bar"?: boolean;
    "post_process_filter"?: string;
    "screenshot_border_path"?: string;
    "has_agent_capabilities"?: boolean;
    "agent_capabilities"?: unknown;
    "HasOverrideURI"?: boolean;
    "OverrideURI"?: unknown;
    "HasQuiz"?: boolean;
    "has_external_link_settings"?: boolean;
    "external_link_settings"?: unknown;
  };
  "emote": {
    "entity_id"?: unknown;
    "emote_id"?: string;
    "emote_length_ticks"?: number;
    "xuid"?: string;
    "platform_id"?: string;
    "flags"?: unknown;
  };
  "emote_list": {
    "player_id"?: unknown;
    "emote_pieces"?: Array<unknown>;
  };
  "entity_event": {
    "runtime_entity_id"?: unknown;
    "event_id"?: unknown;
    "data"?: number;
    "fire_at_position"?: unknown;
  };
  "entity_pick_request": {
    "runtime_entity_id"?: unknown;
    "selected_slot"?: number;
    "with_data"?: boolean;
  };
  "event": {
    "runtime_id"?: unknown;
    "event_type"?: unknown;
    "use_player_id"?: number;
    "event_data"?: unknown;
  };
  "feature_registry": {
    "features"?: Array<{ "name"?: string; "options"?: string }>;
  };
  "filter_text_packet": {
    "text"?: string;
    "from_server"?: boolean;
  };
  "game_rules_changed": {
    "rules"?: Array<unknown>;
  };
  "game_test_request": {
    "max_tests_per_batch"?: number;
    "repetitions"?: number;
    "rotation"?: unknown;
    "stop_on_error"?: boolean;
    "position"?: unknown;
    "tests_per_row"?: number;
    "name"?: string;
  };
  "game_test_results": {
    "succeeded"?: boolean;
    "error"?: string;
    "name"?: string;
  };
  "graphics_override_parameter": {
    "values"?: Array<unknown>;
    "float_value"?: unknown;
    "vec3_value"?: unknown;
    "biome_identifier"?: string;
    "parameter_type"?: unknown;
    "reset"?: boolean;
    "player_id"?: unknown;
  };
  "gui_data_pick_item": {
    "item_name"?: string;
    "item_effects"?: string;
    "hotbar_slot"?: number;
  };
  "hurt_armor": {
    "cause"?: number;
    "damage"?: number;
    "armor_slots"?: bigint;
  };
  "initiate_web_socket_connection": {
    "server"?: string;
  };
  "interact": {
    "action_id"?: unknown;
    "target_entity_id"?: unknown;
    "has_position"?: boolean;
    "position"?: unknown;
  };
  "inventory_content": {
    "window_id"?: unknown;
    "input"?: unknown;
    "container"?: unknown;
    "storage_item"?: unknown;
  };
  "inventory_slot": {
    "window_id"?: unknown;
    "slot"?: number;
    "container"?: unknown;
    "storage_item"?: unknown;
    "item"?: unknown;
  };
  "inventory_transaction": {
    "transaction"?: unknown;
  };
  "item_registry": {
    "itemstates"?: unknown;
  };
  "item_stack_request": {
    "requests"?: Array<unknown>;
  };
  "item_stack_response": {
    "responses"?: unknown;
  };
  "jigsaw_structure_data": {
    "structure_data"?: unknown;
  };
  "lab_table": {
    "action_type"?: unknown;
    "position"?: unknown;
    "reaction_type"?: number;
  };
  "lectern_update": {
    "page"?: number;
    "page_count"?: number;
    "position"?: unknown;
  };
  "lesson_progress": {
    "action"?: number;
    "score"?: number;
    "identifier"?: string;
  };
  "level_chunk": {
    "x"?: number;
    "z"?: number;
    "dimension"?: number;
    "sub_chunk_count"?: number;
    "highest_subchunk_count"?: unknown;
    "cache_enabled"?: boolean;
    "blobs"?: Array<unknown>;
    "payload"?: Buffer;
  };
  "level_event": {
    "event"?: unknown;
    "position"?: unknown;
    "data"?: number;
  };
  "level_event_generic": {
    "event_id"?: number;
    "nbt"?: unknown;
  };
  "level_sound_event": {
    "sound_id"?: unknown;
    "position"?: unknown;
    "extra_data"?: number;
    "entity_type"?: string;
    "is_baby_mob"?: boolean;
    "is_global"?: boolean;
    "entity_unique_id"?: bigint;
    "fire_at_position"?: unknown;
  };
  "level_sound_event_old": {
    "sound_id"?: number;
    "position"?: unknown;
    "block_id"?: number;
    "entity_type"?: number;
    "is_baby_mob"?: boolean;
    "is_global"?: boolean;
  };
  "level_sound_event_v2": {
    "sound_id"?: number;
    "position"?: unknown;
    "block_id"?: number;
    "entity_type"?: string;
    "is_baby_mob"?: boolean;
    "is_global"?: boolean;
  };
  "locator_bar": {
    "waypoints"?: Array<unknown>;
  };
  "login": {
    "protocol_version"?: number;
    "tokens"?: unknown;
  };
  "map_create_locked_copy": {
    "original_map_id"?: bigint;
    "new_map_id"?: bigint;
  };
  "map_info_request": {
    "map_id"?: bigint;
    "client_pixels"?: Array<{ "rgba"?: number; "index"?: unknown }>;
  };
  "mob_armor_equipment": {
    "runtime_entity_id"?: unknown;
    "helmet"?: unknown;
    "chestplate"?: unknown;
    "leggings"?: unknown;
    "boots"?: unknown;
    "body"?: unknown;
  };
  "mob_effect": {
    "runtime_entity_id"?: unknown;
    "event_id"?: unknown;
    "effect_id"?: number;
    "amplifier"?: number;
    "particles"?: boolean;
    "duration"?: number;
    "tick"?: unknown;
    "ambient"?: boolean;
  };
  "mob_equipment": {
    "runtime_entity_id"?: unknown;
    "item"?: unknown;
    "slot"?: number;
    "selected_slot"?: number;
    "window_id"?: unknown;
  };
  "modal_form_request": {
    "form_id"?: number;
    "data"?: string;
  };
  "modal_form_response": {
    "form_id"?: number;
    "has_response_data"?: boolean;
    "data"?: unknown;
    "has_cancel_reason"?: boolean;
  };
  "motion_prediction_hints": {
    "entity_runtime_id"?: unknown;
    "velocity"?: unknown;
    "on_ground"?: boolean;
  };
  "move_entity": {
    "runtime_entity_id"?: unknown;
    "flags"?: number;
    "position"?: unknown;
    "rotation"?: unknown;
  };
  "move_entity_delta": {
    "runtime_entity_id"?: unknown;
    "x"?: unknown;
    "y"?: unknown;
    "z"?: unknown;
    "rot_x"?: unknown;
    "rot_y"?: unknown;
    "rot_z"?: unknown;
    "on_ground"?: boolean;
    "force_move"?: boolean;
    "force_move_local_entity"?: boolean;
    "force_completion"?: boolean;
  };
  "move_player": {
    "runtime_id"?: number;
    "position"?: unknown;
    "pitch"?: number;
    "yaw"?: number;
    "head_yaw"?: number;
    "mode"?: unknown;
    "on_ground"?: boolean;
    "ridden_runtime_id"?: number;
    "teleport"?: unknown;
    "tick"?: unknown;
  };
  "movement_effect": {
    "runtime_id"?: unknown;
    "effect_type"?: unknown;
    "effect_duration"?: number;
    "tick"?: unknown;
  };
  "multiplayer_settings": {
    "action_type"?: unknown;
  };
  "network_chunk_publisher_update": {
    "coordinates"?: unknown;
    "radius"?: number;
    "saved_chunks"?: Array<{ "x"?: number; "z"?: number }>;
  };
  "network_settings": {
    "compression_threshold"?: unknown;
    "compression_algorithm"?: unknown;
    "client_throttle"?: boolean;
    "client_throttle_threshold"?: number;
    "client_throttle_scalar"?: number;
  };
  "network_stack_latency": {
    "timestamp"?: unknown;
    "needs_response"?: number;
  };
  "npc_dialogue": {
    "entity_id"?: unknown;
    "action_type"?: unknown;
    "dialogue"?: string;
    "screen_name"?: string;
    "npc_name"?: string;
    "action_json"?: string;
  };
  "npc_request": {
    "runtime_entity_id"?: unknown;
    "request_type"?: unknown;
    "command"?: string;
    "action_type"?: unknown;
    "scene_name"?: string;
  };
  "on_screen_texture_animation": {
    "animation_type"?: unknown;
  };
  "open_sign": {
    "position"?: unknown;
    "is_front"?: boolean;
  };
  "packet_violation_warning": {
    "violation_type"?: unknown;
    "severity"?: unknown;
    "packet_id"?: number;
    "reason"?: string;
  };
  "party_changed": {
    "party_info"?: unknown;
  };
  "party_destination_cookie_response": {
    "cookie"?: string;
    "accepted"?: boolean;
  };
  "photo_info_request": {
    "photo_id"?: bigint;
  };
  "photo_transfer": {
    "image_name"?: string;
    "image_data"?: string;
    "book_id"?: string;
    "photo_type"?: number;
    "source_type"?: number;
    "owner_entity_unique_id"?: bigint;
    "new_photo_name"?: string;
  };
  "play_sound": {
    "name"?: string;
    "coordinates"?: unknown;
    "volume"?: number;
    "pitch"?: number;
    "loop_count"?: number;
    "handle"?: unknown;
  };
  "play_status": {
    "status"?: unknown;
  };
  "player_action": {
    "runtime_entity_id"?: unknown;
    "action"?: unknown;
    "position"?: unknown;
    "result_position"?: unknown;
    "face"?: number;
  };
  "player_armor_damage": {
    "entries"?: Array<unknown>;
  };
  "player_auth_input": {
    "pitch"?: number;
    "yaw"?: number;
    "position"?: unknown;
    "move_vector"?: unknown;
    "head_yaw"?: number;
    "input_data"?: unknown;
    "input_mode"?: unknown;
    "play_mode"?: unknown;
    "interaction_model"?: unknown;
    "interact_rotation"?: unknown;
    "tick"?: unknown;
    "delta"?: unknown;
    "transaction_presence"?: boolean;
    "transaction"?: unknown;
    "item_stack_request_presence"?: boolean;
    "item_stack_request"?: unknown;
    "block_action_presence"?: boolean;
    "block_action"?: unknown;
    "vehicle_rotation_presence"?: boolean;
    "vehicle_rotation"?: unknown;
    "predicted_vehicle_presence"?: boolean;
    "predicted_vehicle"?: unknown;
    "analogue_move_vector"?: unknown;
    "camera_orientation"?: unknown;
    "raw_move_vector"?: unknown;
  };
  "player_enchant_options": {
    "options"?: Array<unknown>;
  };
  "player_fog": {
    "stack"?: Array<string>;
  };
  "player_hotbar": {
    "selected_slot"?: number;
    "window_id"?: unknown;
    "select_slot"?: boolean;
  };
  "player_input": {
    "motion_x"?: number;
    "motion_z"?: number;
    "jumping"?: boolean;
    "sneaking"?: boolean;
  };
  "player_list": {
    "records"?: unknown;
  };
  "player_location": {
    "entity_unique_id"?: bigint;
    "type"?: unknown;
    "unused"?: number;
    "position"?: unknown;
  };
  "player_skin": {
    "uuid"?: unknown;
    "skin"?: unknown;
    "skin_name"?: string;
    "old_skin_name"?: string;
  };
  "player_update_entity_overrides": {
    "runtime_id"?: unknown;
    "property_index"?: number;
    "type"?: unknown;
    "legacy_type"?: number;
    "value"?: unknown;
  };
  "player_video_capture": {
    "action"?: unknown;
  };
  "position_tracking_db_broadcast": {
    "broadcast_action"?: unknown;
    "tracking_id"?: number;
    "nbt"?: unknown;
  };
  "position_tracking_db_request": {
    "action"?: unknown;
    "tracking_id"?: number;
  };
  "primitive_shapes": {
    "shapes"?: Array<unknown>;
  };
  "purchase_receipt": {
    "receipts"?: Array<string>;
  };
  "refresh_entitlements": {
  };
  "remove_entity": {
    "entity_id_self"?: bigint;
  };
  "remove_objective": {
    "objective_name"?: string;
  };
  "remove_volume_entity": {
    "entity_id"?: unknown;
  };
  "request_ability": {
    "ability"?: unknown;
    "value_type"?: unknown;
    "bool_value"?: boolean;
    "float_val"?: number;
  };
  "request_chunk_radius": {
    "chunk_radius"?: number;
    "max_radius"?: number;
  };
  "request_network_settings": {
    "client_protocol"?: number;
  };
  "request_permissions": {
    "entity_unique_id"?: bigint;
    "permission_level"?: unknown;
    "requested_permissions"?: unknown;
  };
  "resource_pack_chunk_data": {
    "pack_id"?: string;
    "chunk_index"?: unknown;
    "progress"?: unknown;
    "payload"?: Buffer;
  };
  "resource_pack_chunk_request": {
    "pack_id"?: string;
    "chunk_index"?: unknown;
  };
  "resource_pack_client_response": {
    "response_status"?: unknown;
    "response_status_name"?: string;
    "resourcepackids"?: unknown;
  };
  "resource_pack_data_info": {
    "pack_id"?: string;
    "max_chunk_size"?: unknown;
    "chunk_count"?: unknown;
    "size"?: unknown;
    "hash"?: Buffer;
    "is_premium"?: boolean;
    "pack_type"?: unknown;
  };
  "resource_pack_stack": {
    "must_accept"?: boolean;
    "resource_packs"?: unknown;
    "game_version"?: string;
    "experiments"?: unknown;
    "experiments_previously_used"?: boolean;
    "has_editor_packs"?: boolean;
  };
  "resource_packs_info": {
    "must_accept"?: boolean;
    "has_addons"?: boolean;
    "has_scripts"?: boolean;
    "disable_vibrant_visuals"?: boolean;
    "world_template"?: { "uuid"?: unknown; "version"?: string };
    "texture_packs"?: unknown;
  };
  "resource_packs_ready_for_validation": {
  };
  "respawn": {
    "position"?: unknown;
    "state"?: number;
    "runtime_entity_id"?: unknown;
  };
  "rider_jump": {
    "jump_strength"?: number;
  };
  "script_custom_event": {
    "event_name"?: string;
    "event_data"?: string;
  };
  "script_message": {
    "message_id"?: string;
    "data"?: string;
  };
  "send_party_destination_cookie": {
    "cookie"?: string;
    "intent"?: string;
    "destination_name"?: string;
  };
  "server_post_move": {
    "position"?: unknown;
  };
  "server_presence_info": {
    "presence_info"?: unknown;
  };
  "server_script_debug_drawer": {
    "shapes"?: Array<{ "network_id"?: unknown; "shape_type"?: unknown; "location"?: unknown; "scale"?: unknown; "rotation"?: unknown; "time_left"?: unknown; "color"?: unknown; "text"?: unknown; "box_bound"?: unknown; "line_end_location"?: unknown; "arrow_head_length"?: unknown; "arrow_head_radius"?: unknown; "segment_count"?: unknown }>;
  };
  "server_settings_request": {
  };
  "server_settings_response": {
    "form_id"?: number;
    "data"?: string;
  };
  "server_stats": {
    "server_time"?: number;
    "network_time"?: number;
  };
  "server_store_info": {
    "store_info"?: unknown;
  };
  "server_to_client_handshake": {
    "token"?: string;
  };
  "serverbound_data_driven_screen_closed": {
    "form_id"?: unknown;
    "close_reason"?: string;
  };
  "serverbound_data_store": {
    "name"?: string;
    "property"?: string;
    "path"?: string;
    "data_type"?: unknown;
    "data"?: unknown;
    "update_count"?: unknown;
    "path_update_count"?: unknown;
  };
  "serverbound_diagnostics": {
    "average_frames_per_second"?: number;
    "average_server_sim_tick_time"?: number;
    "average_client_sim_tick_time"?: number;
    "average_begin_frame_time"?: number;
    "average_input_time"?: number;
    "average_render_time"?: number;
    "average_end_frame_time"?: number;
    "average_remainder_time_percent"?: number;
    "average_unaccounted_time_percent"?: number;
    "memory_category_values"?: Array<unknown>;
    "entity_diagnostics"?: Array<unknown>;
    "system_diagnostics"?: Array<unknown>;
    "system_categories"?: Array<unknown>;
    "whisker_scopes"?: Array<unknown>;
  };
  "serverbound_loading_screen": {
    "type"?: number;
    "loading_screen_id"?: unknown;
  };
  "serverbound_pack_setting_change": {
    "pack_id"?: unknown;
    "pack_setting"?: { "name"?: string; "type"?: unknown; "value"?: unknown };
  };
  "set_commands_enabled": {
    "enabled"?: boolean;
  };
  "set_default_game_type": {
    "gamemode"?: unknown;
  };
  "set_difficulty": {
    "difficulty"?: number;
  };
  "set_display_objective": {
    "display_slot"?: string;
    "objective_name"?: string;
    "display_name"?: string;
    "criteria_name"?: string;
    "sort_order"?: number;
  };
  "set_entity_data": {
    "runtime_entity_id"?: unknown;
    "metadata"?: unknown;
    "properties"?: unknown;
    "tick"?: unknown;
  };
  "set_entity_link": {
    "link"?: unknown;
  };
  "set_entity_motion": {
    "runtime_entity_id"?: unknown;
    "velocity"?: unknown;
    "tick"?: unknown;
  };
  "set_health": {
    "health"?: number;
  };
  "set_hud": {
    "elements"?: Array<unknown>;
    "visibility"?: unknown;
  };
  "set_last_hurt_by": {
    "entity_type"?: number;
  };
  "set_local_player_as_initialized": {
    "runtime_entity_id"?: unknown;
  };
  "set_movement_authority": {
    "movement_authority"?: unknown;
  };
  "set_player_game_type": {
    "gamemode"?: unknown;
  };
  "set_player_inventory_options": {
    "left_tab"?: unknown;
    "right_tab"?: unknown;
    "filtering"?: boolean;
    "layout"?: unknown;
    "crafting_layout"?: unknown;
  };
  "set_score": {
    "entries"?: Array<{ "entry_type"?: unknown; "entry_type_name"?: string; "scoreboard_id"?: bigint }>;
  };
  "set_scoreboard_identity": {
    "action"?: unknown;
    "entries"?: Array<{ "scoreboard_id"?: bigint; "entity_unique_id"?: unknown }>;
  };
  "set_spawn_position": {
    "spawn_type"?: unknown;
    "player_position"?: unknown;
    "dimension"?: number;
    "world_position"?: unknown;
  };
  "set_time": {
    "time"?: number;
  };
  "set_title": {
    "type"?: unknown;
    "text"?: string;
    "fade_in_time"?: number;
    "stay_time"?: number;
    "fade_out_time"?: number;
    "xuid"?: string;
    "platform_online_id"?: string;
    "filtered_message"?: string;
  };
  "settings_command": {
    "command_line"?: string;
    "suppress_output"?: boolean;
  };
  "show_credits": {
    "runtime_entity_id"?: unknown;
    "status"?: number;
  };
  "show_profile": {
    "xuid"?: string;
  };
  "show_store_offer": {
    "offer_uuid"?: unknown;
    "redirect_type"?: unknown;
  };
  "simple_event": {
    "event_type"?: unknown;
  };
  "simulation_type": {
    "type"?: unknown;
  };
  "spawn_experience_orb": {
    "position"?: unknown;
    "count"?: number;
  };
  "spawn_particle_effect": {
    "dimension"?: number;
    "entity_id"?: bigint;
    "position"?: unknown;
    "particle_name"?: string;
    "molang_variables"?: unknown;
  };
  "start_game": {
    "entity_id"?: bigint;
    "runtime_entity_id"?: unknown;
    "player_gamemode"?: unknown;
    "player_position"?: unknown;
    "rotation"?: unknown;
    "seed"?: unknown;
    "biome_type"?: number;
    "biome_name"?: string;
    "dimension"?: unknown;
    "generator"?: number;
    "world_gamemode"?: unknown;
    "hardcore"?: boolean;
    "difficulty"?: number;
    "spawn_position"?: unknown;
    "achievements_disabled"?: boolean;
    "editor_world_type"?: unknown;
    "created_in_editor"?: boolean;
    "exported_from_editor"?: boolean;
    "day_cycle_stop_time"?: number;
    "edu_offer"?: number;
    "edu_features_enabled"?: boolean;
    "edu_product_uuid"?: string;
    "rain_level"?: number;
    "lightning_level"?: number;
    "has_confirmed_platform_locked_content"?: boolean;
    "is_multiplayer"?: boolean;
    "broadcast_to_lan"?: boolean;
    "xbox_live_broadcast_mode"?: number;
    "platform_broadcast_mode"?: number;
    "enable_commands"?: boolean;
    "is_texturepacks_required"?: boolean;
    "gamerules"?: Array<unknown>;
    "experiments"?: unknown;
    "experiments_previously_used"?: boolean;
    "bonus_chest"?: boolean;
    "map_enabled"?: boolean;
    "permission_level"?: unknown;
    "server_chunk_tick_range"?: number;
    "has_locked_behavior_pack"?: boolean;
    "has_locked_resource_pack"?: boolean;
    "is_from_locked_world_template"?: boolean;
    "msa_gamertags_only"?: boolean;
    "is_from_world_template"?: boolean;
    "is_world_template_option_locked"?: boolean;
    "only_spawn_v1_villagers"?: boolean;
    "persona_disabled"?: boolean;
    "custom_skins_disabled"?: boolean;
    "emote_chat_muted"?: boolean;
    "game_version"?: string;
    "limited_world_width"?: number;
    "limited_world_length"?: number;
    "is_new_nether"?: boolean;
    "edu_resource_uri"?: unknown;
    "experimental_gameplay_override"?: boolean;
    "chat_restriction_level"?: unknown;
    "disable_player_interactions"?: boolean;
    "server_editor_connection_policy"?: number;
    "allow_anonymous_block_drops_in_editor_worlds"?: boolean;
    "level_id"?: string;
    "world_name"?: string;
    "premium_world_template_id"?: string;
    "is_trial"?: boolean;
    "rewind_history_size"?: number;
    "server_authoritative_block_breaking"?: boolean;
    "current_tick"?: bigint;
    "enchantment_seed"?: number;
    "block_properties"?: unknown;
    "multiplayer_correlation_id"?: string;
    "server_authoritative_inventory"?: boolean;
    "engine"?: string;
    "property_data"?: unknown;
    "block_pallette_checksum"?: unknown;
    "world_template_id"?: unknown;
    "client_side_generation"?: boolean;
    "block_network_ids_are_hashes"?: boolean;
    "server_controlled_sound"?: boolean;
    "has_server_join_info"?: boolean;
    "server_join_info"?: unknown;
    "server_identifier"?: string;
    "scenario_identifier"?: string;
    "world_identifier"?: string;
    "owner_identifier"?: string;
  };
  "stop_sound": {
    "name"?: string;
    "stop_all"?: boolean;
    "stop_music_legacy"?: boolean;
  };
  "structure_block_update": {
    "position"?: unknown;
    "structure_name"?: string;
    "filtered_structure_name"?: string;
    "data_field"?: string;
    "include_players"?: boolean;
    "show_bounding_box"?: boolean;
    "structure_block_type"?: number;
    "settings"?: unknown;
    "redstone_save_mode"?: number;
    "should_trigger"?: boolean;
    "water_logged"?: boolean;
  };
  "structure_template_data_export_request": {
    "name"?: string;
    "position"?: unknown;
    "settings"?: unknown;
    "request_type"?: unknown;
  };
  "structure_template_data_export_response": {
    "name"?: string;
    "success"?: boolean;
    "nbt"?: unknown;
    "response_type"?: unknown;
  };
  "sub_client_login": {
    "tokens"?: unknown;
  };
  "subchunk": {
    "cache_enabled"?: boolean;
    "dimension"?: number;
    "origin"?: unknown;
    "entries"?: unknown;
  };
  "subchunk_request": {
    "dimension"?: number;
    "requests"?: Array<unknown>;
    "origin"?: unknown;
  };
  "sync_entity_property": {
    "nbt"?: unknown;
  };
  "sync_world_clocks": {
    "payload_type"?: unknown;
  };
  "take_item_entity": {
    "runtime_entity_id"?: unknown;
    "target"?: number;
  };
  "text": {
    "needs_translation"?: boolean;
    "category"?: unknown;
    "type"?: unknown;
    "xuid"?: string;
    "platform_chat_id"?: string;
    "has_filtered_message"?: boolean;
    "filtered_message"?: unknown;
  };
  "tick_sync": {
    "request_time"?: bigint;
    "response_time"?: bigint;
  };
  "ticking_areas_load_status": {
    "preload"?: boolean;
  };
  "toast_request": {
    "title"?: string;
    "message"?: string;
  };
  "toggle_crafter_slot_request": {
    "position"?: unknown;
    "slot"?: number;
    "disabled"?: boolean;
  };
  "transfer": {
    "server_address"?: string;
    "port"?: unknown;
    "reload_world"?: boolean;
    "gatherings_configuration"?: unknown;
  };
  "trim_data": {
    "patterns"?: Array<{ "item_name"?: string; "pattern"?: string }>;
    "materials"?: Array<{ "material"?: string; "color"?: string; "item_name"?: string }>;
  };
  "unlocked_recipes": {
    "unlock_type"?: unknown;
    "recipes"?: Array<string>;
  };
  "update_abilities": {
    "entity_unique_id"?: bigint;
    "permission_level"?: unknown;
    "command_permission"?: unknown;
    "abilities"?: Array<unknown>;
  };
  "update_adventure_settings": {
    "no_pvm"?: boolean;
    "no_mvp"?: boolean;
    "immutable_world"?: boolean;
    "show_name_tags"?: boolean;
    "auto_jump"?: boolean;
  };
  "update_attributes": {
    "runtime_entity_id"?: unknown;
    "attributes"?: unknown;
    "tick"?: unknown;
  };
  "update_block": {
    "position"?: unknown;
    "block_runtime_id"?: number;
    "flags"?: unknown;
    "layer"?: number;
  };
  "update_block_properties": {
    "nbt"?: unknown;
  };
  "update_block_synced": {
    "position"?: unknown;
    "block_runtime_id"?: number;
    "flags"?: unknown;
    "layer"?: number;
    "entity_unique_id"?: bigint;
    "transition_type"?: unknown;
  };
  "update_client_input_locks": {
    "locks"?: unknown;
  };
  "update_client_options": {
    "graphics_mode"?: unknown;
    "filter_profanity"?: unknown;
  };
  "update_equipment": {
    "window_id"?: unknown;
    "window_type"?: unknown;
    "size"?: number;
    "entity_id"?: bigint;
    "inventory"?: unknown;
  };
  "update_player_game_type": {
    "gamemode"?: unknown;
    "player_unique_id"?: bigint;
    "tick"?: unknown;
  };
  "update_soft_enum": {
    "enum_type"?: string;
    "options"?: Array<string>;
    "action_type"?: unknown;
  };
  "update_subchunk_blocks": {
    "x"?: number;
    "y"?: number;
    "z"?: number;
    "blocks"?: Array<unknown>;
    "extra"?: Array<unknown>;
  };
  "update_trade": {
    "window_id"?: unknown;
    "window_type"?: unknown;
    "size"?: number;
    "trade_tier"?: number;
    "villager_unique_id"?: unknown;
    "entity_unique_id"?: unknown;
    "display_name"?: string;
    "new_trading_ui"?: boolean;
    "economic_trades"?: boolean;
    "offers"?: unknown;
  };
  "video_stream_connect": {
    "server_uri"?: string;
    "frame_send_frequency"?: number;
    "action"?: unknown;
    "resolution_x"?: number;
    "resolution_y"?: number;
  };
  "voxel_shapes": {
    "shapes"?: Array<unknown>;
    "name_map"?: Array<unknown>;
    "custom_shape_count"?: unknown;
  };
}

export type PacketFieldsFor<T extends PacketName> = PacketFields[T];

export interface DeviceInfo { name: string; family: string }
export const Devices: Record<number, DeviceInfo>;

export interface ClientOptions {
  networkId: string;
  compressionLevel?: number;
  [key: string]: unknown;
}

export interface EncapsulatedEvent { buffer: Buffer }

export class Client extends EventEmitter {
  constructor(options: ClientOptions);
  options: ClientOptions;
  connection: unknown;
  init(): Promise<void>;
  connect(): void;
  close(reason?: string): void;
  disconnect(reason?: string): void;
  write<T extends PacketName>(packet: T, fields: PacketFieldsFor<T>): void;
  write(packet: string, fields: Record<string, unknown>): void;
  sendBuffer(buffer: Buffer): void;
  onEncapsulated(encapsulated: EncapsulatedEvent): void;
  sendLogin(): void;
  on(event: "connectionAllowed", listener: () => void): this;
  once(event: "connectionAllowed", listener: () => void): this;
  on(event: "close" | "disconnect", listener: (reason?: string) => void): this;
  once(event: "close" | "disconnect", listener: (reason?: string) => void): this;
  on(event: "error", listener: (error: Error) => void): this;
  once(event: "error", listener: (error: Error) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this;
  once(event: string | symbol, listener: (...args: any[]) => void): this;
}

export type SignalTypeName = string;
export class SignalStructure {
  connectionId: bigint;
  networkId: string | bigint;
  serverNetworkId?: string;
  type: SignalTypeName;
  static fromString(value: string): SignalStructure;
  toString(): string;
}
export const SignalType: Record<string, string | number>;

export interface NethernetEvents {
  connected: () => void;
  disconnect: (connectionId: bigint, reason: string) => void;
  encapsulated: (packet: Buffer) => void;
  unreliable: (packet: Buffer) => void;
  fault: (error: Error) => void;
}

export class NethernetTransportClient extends EventEmitter {
  constructor(networkId: string | bigint, token?: string, ecdhKeyPair?: unknown);
  networkId: string | bigint;
  credentials: unknown;
  signalHandler: (signal: SignalStructure) => unknown;
  connect(): Promise<void>;
  close(): void;
  send(data: Buffer): void;
  sendReliable(data: Buffer): void;
  sendUnreliable(data: Buffer): void;
  handleSignal(signal: SignalStructure): Promise<void>;
  on<K extends keyof NethernetEvents>(event: K, listener: NethernetEvents[K]): this;
  once<K extends keyof NethernetEvents>(event: K, listener: NethernetEvents[K]): this;
}

export class NethernetJSONRPC extends EventEmitter {
  constructor(networkId: string | bigint, authflow: unknown, version: string, serverNetworkId?: string);
  credentials: unknown;
  connect(): Promise<void>;
  destroy(resume?: boolean): Promise<void>;
  write(signal: SignalStructure): void;
  on(event: "signal", listener: (signal: SignalStructure) => void): this;
  once(event: "credentials", listener: (credentials: unknown) => void): this;
  on(event: "error", listener: (error: Error) => void): this;
}
