import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';

type Workspace = {
	id: string;
	name: string;
	thumbnail: string;
};

type Ticket = {
	id: string;
	title: string;
	subTickets?: Ticket[];
};

// Header Component
const Header: React.FC = () => (
	<header className="bg-blue-600 text-white p-4">
		<h1 className="text-2xl font-bold">Ticket Manager</h1>
	</header>
);

// Sidebar Component
const Sidebar: React.FC<{ workspaces: Workspace[] }> = ({ workspaces }) => (
	<aside className="w-64 bg-gray-100 h-screen p-4">
		<h2 className="text-xl font-semibold mb-4">Workspaces</h2>
		<ul>
			{workspaces.map((workspace) => (
				<li key={workspace.id} className="mb-2 flex items-center">
					<img src={workspace.thumbnail} alt={workspace.name} className="w-8 h-8 mr-2 rounded-full" />
					<span>{workspace.name}</span>
				</li>
			))}
		</ul>
	</aside>
);

// TicketList Component
const TicketList: React.FC<{ tickets: Ticket[] }> = ({ tickets }) => {
	const renderTicket = (ticket: Ticket, depth = 0) => (
		<div key={ticket.id} className={`ml-${depth * 4}`}>
			<div className="flex items-center">
				{ticket.subTickets ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
				<span className="ml-2">{ticket.title}</span>
			</div>
			{ticket.subTickets?.map((subTicket) => renderTicket(subTicket, depth + 1))}
		</div>
	);

	return (
		<div className="w-1/2 p-4">
			<h3 className="text-lg font-semibold mb-4">Tickets</h3>
			{tickets.map((ticket) => renderTicket(ticket))}
		</div>
	);
};

// GanttChart Component (placeholder)
const GanttChart: React.FC = () => {
	// const [tickets, setTickets] = useState([
	// 	{ id: '1', title: 'Task 1', startDate: new Date(2024, 6, 1), endDate: new Date(2024, 6, 5) },
	// 	{ id: '2', title: 'Task 2', startDate: new Date(2024, 6, 3), endDate: new Date(2024, 6, 8) },
	// 	// Add more tickets as needed
	// ]);

	return (
		<div className="w-1/2 p-4">
			{/* <SimpleGanttChart
				tickets={tickets}
				startDate={new Date(2024, 6, 1)}
				endDate={new Date(2024, 6, 31)}
			/> */}
			<h3 className="text-lg font-semibold mb-4">Gantt Chart</h3>
			<div className="bg-gray-200 h-64 flex items-center justify-center">
				Gantt Chart Placeholder
			</div>
		</div>
	);
};

// Main App Component
const TicketManagerApp: React.FC = () => {
	const [workspaces] = useState<Workspace[]>([
		{ id: '1', name: 'Workspace 1', thumbnail: '/api/placeholder/32/32' },
		{ id: '2', name: 'Workspace 2', thumbnail: '/api/placeholder/32/32' },
	]);

	const [tickets] = useState<Ticket[]>([
		{
			id: '1',
			title: 'Main Ticket 1',
			subTickets: [
				{ id: '1.1', title: 'Sub Ticket 1.1' },
				{ id: '1.2', title: 'Sub Ticket 1.2' },
			],
		},
		{ id: '2', title: 'Main Ticket 2' },
	]);

	return (
		<div className="flex flex-col h-screen">
			<Header />
			<div className="flex flex-1 overflow-hidden">
				<Sidebar workspaces={workspaces} />
				<main className="flex-1 overflow-auto">
					<div className="flex items-center justify-between p-4 bg-gray-200">
						<h2 className="text-xl font-semibold">Project Overview</h2>
						<Menu size={24} />
					</div>
					<div className="flex">
						<TicketList tickets={tickets} />
						<GanttChart />
					</div>
				</main>
			</div>
		</div>
	);
};

export default TicketManagerApp;
