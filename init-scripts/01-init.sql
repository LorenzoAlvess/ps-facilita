DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'clientes') THEN
    CREATE TABLE clientes (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      telefone VARCHAR(20) NOT NULL,
      coordenada_x FLOAT NOT NULL,
      coordenada_y FLOAT NOT NULL
    );
  END IF;
END $$;
