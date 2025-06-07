import { useEffect, useState } from "react"
import { allData } from "./data"

function App() {
	const [data, setData] = useState(allData)
	const [task, setTask] = useState('')

	const [firstTimeTip, setFirstTimeTip] = useState(true)
	const [hasShownTip, setHasShownTip] = useState(false)

	const handleShownTask = (index) => {
		setData(
			data.map(el => {
				if(el.id === index) {
					return {...el, isActive: true}
				} else {
					return {...el, isActive: false}
				} 
			})
		)
	}

	const handleAddTask = (key, index) => {
		if (key === "Enter" && document.getElementById("taskInput").value != '') {
			addTask(index, task)
			document.getElementById("taskInput").value = ""
		}
	}

	const addTask = (index, task) => {
		setData(
			data.map(el => {
				if (el.id === index) {
					let lastId = el.tasks.length > 0 ? el.tasks[el.tasks.length - 1].id : 0

					return {...el, tasks: [...el.tasks, {id: lastId+1, task: task, isDone: false}]}
				}
				return el
			})
		)

		if (firstTimeTip) {
			setHasShownTip(true)
		}
	}

	const removeTask = (e, parentIndex, index) => {
		e.stopPropagation()
		setData(
			data.map(el => {
				if (el.id === parentIndex) {
					const updatedTasks = el.tasks.filter(task => {
						return task.id !== index
					})
					return {...el, tasks: updatedTasks}
				}
				return el
			})
		)

		setHasShownTip(false)
		setFirstTimeTip(false)
	}

	const handleDoneTask = (parentId, index) => {
		setData(
			data.map(el => {
				if (el.id === parentId) {
					const updatedTask = el.tasks.map(task => {
						if (task.id === index) {
							return {...task, isDone: !task.isDone}
						} 
						return task
					})
					return {...el, tasks: updatedTask}
				}
				return el
			})
		)
	}

	useEffect(() => {
		console.log(data)
	}, [data])

	return (
		<main className="w-[500px] max-md:w-full">
			{data.map((el) => 
				<div
					key={ el.id } 
					style={{ backgroundColor: el.bgColor }}
					className={ `w-full flex items-center p-4 cursor-pointer ${el.isActive ? 'flex-col gap-4 items-start justify-between' : ''} `}
					onClick={() => handleShownTask( el.id )}
				>
					<div>
						<h1 className="text-2xl font-extrabold"> { el.name.toUpperCase() } </h1>
						{el.isActive && <h2 className="text-xs text-gray-500"> { el.date } </h2>}
					</div>
					
					{
						el.isActive && 
						<div className="flex flex-col gap-2 w-full">
							{
								el.tasks.length > 0 && 
								el.tasks.map(task => 
									<div 
										key={task.id} 
										className="flex gap-2"
									>
										<input 
											type="checkbox" 
											className="accent-orange-500"
											onChange={() => handleDoneTask(el.id, task.id)}
										/>
										<p 
											className={`${task.isDone ? 'line-through' : ''} break-all`}
											onClick={(e) => removeTask(e, el.id, task.id)}
										>
											{ task.task }
										</p>
									</div>
								)
							}
							<div className="flex">
								<input 
									type="text" 
									placeholder="Enter a task..." 
									className="outline-none w-full" 
									id="taskInput"
									onChange={(e) => setTask(e.target.value)}
									onKeyDown={(e) => handleAddTask(e.key, el.id)}
								/>
							</div>
							
						</div>
					}
				</div>
			)}

			{
				hasShownTip && 
				<p
					className="text-center text-gray-600 mt-2"
				>
					Tip: Press on the task name to remove it
				</p>
			}
		</main>
	)

}

export default App