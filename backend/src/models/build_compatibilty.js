// CREATE TABLE build_compatibility (
//   build_id INT PRIMARY KEY
//     REFERENCES builds(id)
//     ON DELETE CASCADE,

//   status TEXT NOT NULL
//     CHECK (status IN ('ok', 'warning', 'blocked')),

//   blockers JSONB NOT NULL DEFAULT '[]',
//   warnings JSONB NOT NULL DEFAULT '[]',

//   calculated_at TIMESTAMP NOT NULL DEFAULT NOW()
// );
