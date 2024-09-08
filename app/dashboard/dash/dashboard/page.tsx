"use client";
import DashMain from "../../../components/dashcomponents/DashMain";
import ClientComponent from "../../../components/ClientComponent";

export default function Dashboard() {
  return (
    <ClientComponent>
      <div>
        <div>
          <DashMain />
        </div>
      </div>
    </ClientComponent>
  );
}
