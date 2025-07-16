CREATE TABLE IF NOT EXISTS rel_user_chat (
  user_id INT NOT NULL,
  chat_id INT NOT NULL,
  PRIMARY KEY (user_id, chat_id),
  FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
  FOREIGN KEY (chat_id) REFERENCES Chat(id) ON DELETE CASCADE
);