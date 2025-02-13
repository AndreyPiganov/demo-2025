import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

export default function AddOrEditFamilyMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [member, setMember] = useState({
    full_name: "",
    birth_date: "",
    email: "",
    phone: "",
    job_title: "",
    employer: "",
    salary: "",
    start_date: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = isEditMode ? "Редактировать члена семьи" : "Добавить члена семьи";

    if (isEditMode) {
      async function fetchMember() {
        const members = await window.api.fetchFamilyMembers();
        const foundMember = members.find((m) => m.id === parseInt(id));

        if (foundMember) {
          setMember({
            ...foundMember,
            birth_date: foundMember.birth_date ? new Date(foundMember.birth_date).toISOString().split("T")[0] : "",
            start_date: foundMember.start_date ? new Date(foundMember.start_date).toISOString().split("T")[0] : "",
          });
        }
      }
      fetchMember();
    }
  }, [id, isEditMode]);

  async function submitHandler(e) {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];
    let newErrors = {};

    if (!member.full_name.trim()) {
      newErrors.full_name = "ФИО не может быть пустым!";
    }

    if (member.birth_date > today) {
      newErrors.birth_date = "Дата рождения не может быть в будущем!";
    }

    if (member.salary < 0) {
      newErrors.salary = "Доход не может быть отрицательным!";
    }

    if (member.start_date && member.start_date > today) {
      newErrors.start_date = "Дата начала работы не может быть в будущем!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    if (isEditMode) {
      await window.api.modifyFamilyMember(member);
    } else {
      await window.api.addFamilyMember(member);
    }

    navigate("/");
  }

  return (
    <div className="form-container">
      <h1>{isEditMode ? "Редактировать члена семьи" : "Добавить члена семьи"}</h1>

      <form onSubmit={submitHandler}>
        <label htmlFor="full_name">ФИО:</label>
        <input
          id="full_name"
          type="text"
          required
          value={member.full_name}
          onChange={(e) => setMember({ ...member, full_name: e.target.value })}
        />
        {errors.full_name && <span className="error-message">{errors.full_name}</span>}

        <label htmlFor="birth_date">Дата рождения:</label>
        <input
          id="birth_date"
          type="date"
          required
          max={new Date().toISOString().split("T")[0]}
          defaultValue={member.birth_date}
          onChange={(e) => setMember({ ...member, birth_date: e.target.value })}
        />
        {errors.birth_date && <span className="error-message">{errors.birth_date}</span>}

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          value={member.email}
          onChange={(e) => setMember({ ...member, email: e.target.value })}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}

        <label htmlFor="phone">Телефон:</label>
        <input
          id="phone"
          type="tel"
          value={member.phone}
          onChange={(e) => setMember({ ...member, phone: e.target.value })}
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}

        <label htmlFor="job_title">Текущая должность:</label>
        <input
          id="job_title"
          type="text"
          value={member.job_title}
          onChange={(e) => setMember({ ...member, job_title: e.target.value })}
        />

        <label htmlFor="employer">Текущее место работы:</label>
        <input
          id="employer"
          type="text"
          value={member.employer}
          onChange={(e) => setMember({ ...member, employer: e.target.value })}
        />

        <label htmlFor="salary">Текущий месячный доход:</label>
        <input
          id="salary"
          type="number"
          min="0"
          required
          value={member.salary}
          onChange={(e) => setMember({ ...member, salary: e.target.value })}
        />
        {errors.salary && <span className="error-message">{errors.salary}</span>}

        <label htmlFor="start_date">Дата начала работы:</label>
        <input
          id="start_date"
          type="date"
          max={new Date().toISOString().split("T")[0]}
          defaultValue={member.start_date}
          onChange={(e) => setMember({ ...member, start_date: e.target.value })}
        />
        {errors.start_date && <span className="error-message">{errors.start_date}</span>}

        <button type="submit">{isEditMode ? "Сохранить изменения" : "Добавить"}</button>
      </form>

      <Link to="/">
        <button className="back-button">{"<-- Назад"}</button>
      </Link>
    </div>
  );
}