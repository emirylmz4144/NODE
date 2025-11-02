```sql

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);


CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,                           
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,  
    text TEXT NOT NULL,                             
    completed BOOLEAN DEFAULT false,               
    created_at TIMESTAMP DEFAULT NOW(),              
    updated_at TIMESTAMP DEFAULT NOW()             
);


```
```sql

--triggers

CREATE OR REPLACE FUNCTION update_task_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_task_timestamp
BEFORE UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION update_task_timestamp();

```

