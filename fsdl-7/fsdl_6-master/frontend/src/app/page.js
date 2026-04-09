import StudentForm from "./components/StudentForm";
import StudentTable from "./components/StudentTable";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Student CRUD System</h1>
      <StudentForm />
      <StudentTable />
    </div>
  );
}