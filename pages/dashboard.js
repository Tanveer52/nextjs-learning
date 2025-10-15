import React from "react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [d, setD] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/dashboard")
      .then((raw) => raw.json())
      .then((data) => {
        setD(data);
        setIsLoading(false);
      });
  }, []);

  const styles = {
    page: {
      fontFamily: "Inter, Roboto, Arial, sans-serif",
      padding: 20,
      background: "#f5f7fa",
      minHeight: "100vh",
      color: "#111",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    title: { fontSize: 22, fontWeight: 700 },
    container: { display: "grid", gap: 16 },
    statsRow: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
    },
    statCard: {
      flex: "1 1 150px",
      minWidth: 140,
      background: "#fff",
      padding: 14,
      borderRadius: 10,
      boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
    },
    statLabel: { fontSize: 12, color: "#6b7280", marginBottom: 6 },
    statNumber: { fontSize: 20, fontWeight: 700 },
    section: {
      background: "#fff",
      padding: 14,
      borderRadius: 10,
      boxShadow: "0 6px 18px rgba(15,23,42,0.06)",
    },
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid #eef2f7",
    },
    smallMuted: { fontSize: 12, color: "#6b7280" },
  };

  if (isLoading) return <h1>Loading........</h1>;

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Dashboard</div>
          <div style={{ fontSize: 13, color: "#6b7280" }}>
            Overview & recent activity
          </div>
        </div>
        <div style={{ fontSize: 13, color: "#6b7280" }}>
          As of {new Date().toLocaleString()}
        </div>
      </div>

      <div style={styles.container}>
        {/* Stats row */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Total Users</div>
            <div style={styles.statNumber}>{d.totalUsers}</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statLabel}>Active Users</div>
            <div style={styles.statNumber}>{d.activeUsers}</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statLabel}>New Today</div>
            <div style={styles.statNumber}>{d.newUsersToday}</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statLabel}>Total Posts</div>
            <div style={styles.statNumber}>{d.totalPosts}</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statLabel}>Total News</div>
            <div style={styles.statNumber}>{d.totalNews}</div>
          </div>
        </div>

        {/* Recent activities */}
        <div style={styles.section}>
          <div style={{ marginBottom: 8, fontWeight: 700 }}>
            Recent Activities
          </div>

          {Array.isArray(d.recentActivities) &&
          d.recentActivities.length > 0 ? (
            d.recentActivities.map((act) => (
              <div key={act.id} style={styles.listItem}>
                <div>{act.activity}</div>
                <div style={styles.smallMuted}>
                  {new Date(act.timestamp).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: 8, color: "#6b7280" }}>
              No recent activity
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
