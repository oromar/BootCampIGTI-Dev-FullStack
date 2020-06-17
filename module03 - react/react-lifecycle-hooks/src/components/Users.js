import React, { useState, useEffect } from "react";
import User from "./User";

export default function Users({ users }) {
  const [visibleBy, setVisibleBy] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setVisibleBy(visibleBy + 1), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [visibleBy]);

  return (
    <div>
      <h1>Usuários visíveis por {visibleBy} segundos</h1>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {users.map((user) => (
          <li key={user.id.value}>
            <User user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}
