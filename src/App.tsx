import { useState } from 'react'
import './App.css'
import TicketManagerApp from './TicketManagerApp'

function App() {
	const [count, setCount] = useState(0)

	return (
		<>
			<TicketManagerApp />
		</>
	)
}

export default App
