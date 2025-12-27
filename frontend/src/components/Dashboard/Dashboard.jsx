import React, { useState, useEffect, useContext } from 'react';
import { getEquipment, getRequests, getTeams, getStatistics } from '../../services/api';
import { AuthContext } from '../../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalEquipment: 0,
    totalRequests: 0,
    totalTeams: 0,
    openRequests: 0,
    inProgressRequests: 0,
    repairedRequests: 0,
  });
  const [chartData, setChartData] = useState({
    requestsByTeam: [],
    requestsByCategory: [],
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [equipmentRes, requestsRes, teamsRes, statisticsRes] = await Promise.all([
        getEquipment(),
        getRequests(),
        getTeams(),
        getStatistics(),
      ]);

      setStats({
        totalEquipment: equipmentRes.data.length,
        totalRequests: requestsRes.data.length,
        totalTeams: teamsRes.data.length,
        openRequests: requestsRes.data.filter(r => r.stage === 'New').length,
        inProgressRequests: requestsRes.data.filter(r => r.stage === 'In Progress').length,
        repairedRequests: requestsRes.data.filter(r => r.stage === 'Repaired').length,
      });

      setChartData({
        requestsByTeam: statisticsRes.data.requestsByTeam.map(item => ({
          name: item.team.name,
          count: item.count,
        })),
        requestsByCategory: statisticsRes.data.requestsByCategory.map(item => ({
          name: item._id,
          value: item.count,
        })),
      });

      setRecentRequests(requestsRes.data.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
      setLoading(false);
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}! 👋</h1>
        <p>Here's what's happening with your maintenance operations</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon equipment">📦</div>
          <div className="stat-content">
            <h3>Total Equipment</h3>
            <p className="stat-number">{stats.totalEquipment}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon requests">📋</div>
          <div className="stat-content">
            <h3>Total Requests</h3>
            <p className="stat-number">{stats.totalRequests}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon teams">👥</div>
          <div className="stat-content">
            <h3>Active Teams</h3>
            <p className="stat-number">{stats.totalTeams}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon open">🔔</div>
          <div className="stat-content">
            <h3>Open Requests</h3>
            <p className="stat-number">{stats.openRequests}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon progress">⚡</div>
          <div className="stat-content">
            <h3>In Progress</h3>
            <p className="stat-number">{stats.inProgressRequests}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon repaired">✅</div>
          <div className="stat-content">
            <h3>Repaired</h3>
            <p className="stat-number">{stats.repairedRequests}</p>
          </div>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-card">
          <h3>Requests by Team</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.requestsByTeam}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Requests by Equipment Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.requestsByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => entry.name}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.requestsByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="recent-requests">
        <h3>Recent Maintenance Requests</h3>
        <div className="requests-table">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Equipment</th>
                <th>Type</th>
                <th>Stage</th>
                <th>Priority</th>
                <th>Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map(request => (
                <tr key={request._id}>
                  <td>{request.subject}</td>
                  <td>{request.equipment?.name}</td>
                  <td>
                    <span className={`badge ${request.type.toLowerCase()}`}>
                      {request.type}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${request.stage.toLowerCase().replace(' ', '-')}`}>
                      {request.stage}
                    </span>
                  </td>
                  <td>
                    <span className={`badge priority-${request.priority.toLowerCase()}`}>
                      {request.priority}
                    </span>
                  </td>
                  <td>{request.assignedTo?.name || 'Unassigned'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
