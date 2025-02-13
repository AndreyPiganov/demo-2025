import { Link, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import logo from './assets/logo.png';

function App() {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [budgetStatus, setBudgetStatus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFamilyMembers() {
      const members = await window.api.fetchFamilyMembers();
      setFamilyMembers(members);

      const budgetData = {};
      for (const member of members) {
        const result = await window.api.calculateBudgetRatio(member.id);
        budgetData[member.id] = result;
      }
      setBudgetStatus(budgetData);
    }
    fetchFamilyMembers();
  }, []);

  return (
    <div className="container">
      <img className="page-logo" src={logo} alt="" />
      <h1>Семейный бюджет</h1>
      <Link to="/add-member" className="add-button">Добавить члена семьи</Link>
      <div className="family-list">
        {familyMembers.map((member) => (
          <div className="family-card" key={member.id} onClick={() => navigate(`/edit-member/${member.id}`)}>
            <div className="card-content">
              <div className="card-left">
                <strong>{member.full_name}</strong>
                <p>Возраст: {new Date().getFullYear() - new Date(member.birth_date).getFullYear()}</p>
                <p>Текущая должность: {member.job_title ? member.job_title : "Безработный"}</p>
                <p>Место работы: {member.employer ? member.employer : "—"}</p>
                <p>Суммарный оклад: {member.salary ? `${member.salary} ₽` : "0 ₽"}</p>
              </div>
              <div className="card-right">
                <strong>Соотношение трат к доходам:</strong>
                <p className="budget-status">{budgetStatus[member.id] || "Загрузка..."}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;