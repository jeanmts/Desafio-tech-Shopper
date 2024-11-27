
CREATE TABLE drivers (
  driver_id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  car_model VARCHAR(100),
  rating FLOAT,
  avaliation TEXT,
  rate DECIMAL(5,2),
  kilometer FLOAT,
  price_per_rate NUMERIC
);

create table users(
user_id serial PRIMARY KEY,
origin text,
destination text
);

CREATE TABLE travel_history (
    id SERIAL PRIMARY KEY,      
    driver_id INT NOT NULL,                    
    user_id INT NOT NULL,                      
    date_time TIMESTAMP NOT NULL,               
    driver_name TEXT,                           
    origin TEXT NOT NULL,                       
    destination TEXT NOT NULL,                  
    distance NUMERIC NOT NULL,                  
    time TEXT NOT NULL,                      
    race_value NUMERIC,

     FOREIGN KEY (driver_id) REFERENCES drivers (driver_id),
     FOREIGN KEY (user_id) REFERENCES users (user_id)
);


INSERT INTO drivers 
( name,
  description,
  car_model,
  rating,
  avaliation,
  rate,
  kilometer)
VALUES
  ('Homer Simpson',
   'Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).',
   'Plymouth Valiant 1973 rosa e enferrujado',
   2.5,
   'Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.',
   2.50,
   1.0),

  ('Dominic Toretto',
   'Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.',
   'Dodge Charger R/T 1970 modificado',
   4.0,
   'Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!',
   5.00,
   5.0),

  ('James Bond',
   'Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.',
   'Aston Martin DB5 clássico',
   5.0,
   'Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.',
   10.00,
   10.0);
