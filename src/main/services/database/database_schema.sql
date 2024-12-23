
-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    img_path TEXT,
    stock_quantity DECIMAL(10, 2) NOT NULL,
    stock_type VARCHAR(50) CHECK (stock_type IN ('unidade', 'peso')) NOT NULL
);

-- Tabela de Movimentações de Estoque
CREATE TABLE IF NOT EXISTS stock_movements (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    movement_type VARCHAR(50) CHECK (movement_type IN ('entrada', 'saida')) NOT NULL,
    quantity DECIMAL(10, 2) NOT NULL,
    date TIMESTAMP NOT NULL,  -- Agora a data será inserida manualmente
    reason TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
