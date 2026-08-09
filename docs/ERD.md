# Entity Relationship Diagram

The following diagram illustrates the core relationships in the Cvyon PostgreSQL (Supabase) database.

```mermaid
erDiagram
    users ||--o{ subscriptions : has
    users ||--o{ candidate_profiles : "1-to-1 extension"
    
    users {
        uuid id PK
        string email
    }

    subscriptions {
        uuid id PK
        uuid user_id FK
        string plan
        string status
        timestamp current_period_end
    }

    candidate_profiles {
        uuid id PK
        uuid user_id FK "Matches users.id if authenticated"
        string email UK
        string full_name
        string current_title
        string industry
        string country
        boolean consent_email_jobs
        timestamp deleted_at "Soft delete marker"
    }

    analytics_events {
        uuid id PK
        string event_type
        string session_id
        string country
        jsonb metadata
        timestamp created_at
    }

    app_settings {
        string key PK
        string value
        timestamp updated_at
    }

    audit_logs {
        uuid id PK
        string actor_email
        string action
        string target_table
        string target_id
        jsonb metadata
        timestamp created_at
    }
```

## Key Notes
- **`users`**: Managed by Supabase Auth (`auth.users`).
- **`candidate_profiles`**: Contains both authenticated users (where `user_id` matches `auth.users.id`) and guest users (identified solely by `email`).
- **Soft Deletes**: The `candidate_profiles` table implements soft-deletes via the `deleted_at` column to preserve analytical integrity while fulfilling data deletion requests.
