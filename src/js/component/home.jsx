import React, { useEffect, useState } from "react";
//include images into your bundle
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

//create your first component
const Home = () => {
	
	const [valorinput, setValorInput] = useState("");
	const [porhacer, setPorhacer] = useState([]);

	//Creando usuario

	const crearUsuario = async () => {
		console.log("creando usuario");
		try {
			const url = 'https://playground.4geeks.com/todo/users/RosangelM'
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify([])
			})
			if (!response.ok) {
				throw new Error("Error request")
			}
			const resultado = await response.json()
			if (resultado.msg) {
				obtenerData()
			} else {
				obtenerData()
			}
		} catch (error) {
			console.log("Error creando usuario:", error)
		}
	};

	//METODO GET

	const obtenerData = () => {
		console.log("consultando datos")
		 fetch('https://playground.4geeks.com/todo/users/RosangelM', {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
				if (data.msg== "The user rosangelM doesn't exists")  {
					crearUsuario()
				} 
			setPorhacer(data.todos)
			})
			.catch(error => {
				//manejo de errores
				console.log(error);
			});
	}
	useEffect(() => {
		obtenerData()
	},[])

	//POST METHOD
	const agregarTarea = async (task) => {
        await fetch("https://playground.4geeks.com/todo/todos/RosangelM", {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("Failed to add task");
                }
                return resp.json();
            })
            .then(data => {
                console.log(data);
                setPorhacer([...porhacer, data]);
            })
            .catch(error => {
                console.log(error);
            });
    };

	//DELETE METHOD

	const eliminarTarea =  (index) => {
		const taskId = porhacer[index].id;
		fetch("https://playground.4geeks.com/todo/todos/" + taskId, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp => {
			console.log("Respuesta del servidor:", resp);
			if (!resp.ok) {
				throw new Error("Failed to delete task");
			}
			const updatedTasks = porhacer.filter((_, i) => i !== index);
			setPorhacer(updatedTasks);
		})
		.catch(error => {
			console.log(error);
		});
	};
	const deleteTarea = () => {
    Promise.all(
        porhacer.map(async task => {
            const taskId = task.id;
            const resp = await fetch("https://playground.4geeks.com/todo/todos/" + taskId, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (!resp.ok) {
				throw new Error(`Failed to delete task with id ${taskId}`);
			}
        })
    )
    .then(() => {
        console.log("All tasks deleted successfully");
        setPorhacer([]);
    })
    .catch(error => {
        console.error("Error deleting tasks:", error);
    });
};

	const handleChange = (e) => {
		setValorInput({label:e.target.value, is_done:false});
	}
	const handleOnKeydown = (e) => {
		if (e.key === "Enter" && e.target.value !== "") {
			const newTask = { label: e.target.value, is_done: false };
			agregarTarea(newTask);
			setValorInput("");
		}
	};
	return (
		<div className="List">
			<div>
			</div>
			<h1>My To Do List</h1>
			<ul>
				<li>
					<input
						type="text"
						placeholder={"What needs to be done?"}
						name="label"
						onChange={(e) => { 
							handleChange(e);
					
						}}
					
						onKeyDown={(e) => {
							handleOnKeydown(e);
						}}>
					</input>
					
					<div className= "Delete">
				<button onClick={() => (deleteTarea())}>Delete All</button>
				</div>
				</li>
				
				{porhacer.map((texto, index) => {
					return (
						<li key ={index}>{texto.label}<button onClick={() => eliminarTarea(index)}><FontAwesomeIcon icon={faTrashCan} /></button>
						</li>
					)
				})}
			</ul>
			<div>{porhacer.length} Item left</div>
		</div>
	);
};

export default Home;
