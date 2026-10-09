import type { EventRequest, EventUpdateRequest } from "@/api/@types";
import { useCreateEvent } from "@/hooks/Event/useCreateEvent";
import { useGetEventById } from "@/hooks/Event/useGetEventById";
import { useUpdateEvent } from "@/hooks/Event/useUpdateEvent";
import { useState } from "react";
import styles from "./Test.module.css";

export function TestCreateEvent() {
    const { mutate } = useCreateEvent();

    const [name, setName] = useState('');
    const [institution, setInstitution] = useState('');
    const [workload, setWorkload] = useState(0);
    const [description, setDescription] = useState('');
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [created_at, setCreatedAt] = useState(new Date());

    const create = () => {
        const formData: EventRequest = {
            name: name,
            institution: institution,
            workload: workload,
            description: description,
            start_date: start_date,
            end_date: end_date,
            created_at: created_at,
        };

        mutate({ event_data: formData });
    };

    const date_example = (fromDate: Date) => {
        return (
            fromDate.getFullYear().toString() +
            "-" +
            (fromDate.getMonth() + 1).toString().padStart(2, "0") +
            "-" +
            fromDate.getDate().toString().padStart(2, "0")
        );
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Criar Evento</h3>

            <div className={styles.field}>
                <label className={styles.label}>Nome</label>
                <input
                    className={styles.input}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome do evento"
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Instituição</label>
                <input
                    className={styles.input}
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Instituição"
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Carga Horária</label>
                <input
                    className={styles.input}
                    type="number"
                    value={workload}
                    onChange={(e) => setWorkload(e.target.valueAsNumber)}
                    placeholder="Carga horária em horas"
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Descrição</label>
                <input
                    className={styles.input}
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição"
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Data de Início</label>
                <input
                    className={styles.input}
                    type="date"
                    value={date_example(start_date)}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Data de Término</label>
                <input
                    className={styles.input}
                    type="date"
                    value={date_example(end_date)}
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Data de Criação</label>
                <input
                    className={styles.input}
                    type="date"
                    value={date_example(created_at)}
                    onChange={(e) => setCreatedAt(new Date(e.target.value))}
                />
            </div>

            <button className={styles.button} onClick={create}>
                Criar
            </button>
        </div>
    );
}

export function TestGetEventById() {
    const [idEvent, setIdEvent] = useState('');
    const { data, isLoading, isError, error } = useGetEventById(idEvent);

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Buscar Evento por ID</h3>

            <div className={styles.field}>
                <label className={styles.label}>ID do Evento</label>
                <input
                    className={styles.input}
                    type="text"
                    value={idEvent}
                    onChange={(e) => setIdEvent(e.target.value)}
                    placeholder="Insira o ID"
                />
            </div>

            <div className={styles.responseBox}>
                {isLoading ? (
                    <span>Carregando...</span>
                ) : isError ? (
                    <span>Erro: {error?.message}</span>
                ) : (
                    <pre className={styles.codeOutput}>
                        {JSON.stringify(data, null, 2)}
                    </pre>
                )}
            </div>
        </div>
    );
}

export function TestUpdateEvent() {
    const { mutate } = useUpdateEvent();

    const [event_id, setEventId] = useState('');
    const [name, setName] = useState('');
    const [workload, setWorkload] = useState(0);
    const [description, setDescription] = useState('');
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());

    const create = () => {
        const formData: EventUpdateRequest = {
            name: name,
            workload: workload,
            description: description,
            start_date: start_date,
            end_date: end_date,
        };

        mutate({ event_id: event_id, event_data: formData });
    };

    const date_example = (fromDate: Date) => {
        return (
            fromDate.getFullYear().toString() +
            "-" +
            (fromDate.getMonth() + 1).toString().padStart(2, "0") +
            "-" +
            fromDate.getDate().toString().padStart(2, "0")
        );
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Atualizar Evento</h3>

            <div className={styles.field}>
                <label className={styles.label}>ID do Evento</label>
                <input
                    className={styles.input}
                    type="text"
                    value={event_id}
                    onChange={(e) => setEventId(e.target.value)}
                    placeholder="ID do evento"
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Nome</label>
                <input
                    className={styles.input}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Novo nome"
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Carga Horária</label>
                <input
                    className={styles.input}
                    type="number"
                    value={workload}
                    onChange={(e) => setWorkload(e.target.valueAsNumber)}
                    placeholder="Nova carga horária"
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Descrição</label>
                <input
                    className={styles.input}
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Nova descrição"
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Data de Início</label>
                <input
                    className={styles.input}
                    type="date"
                    value={date_example(start_date)}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Data de Término</label>
                <input
                    className={styles.input}
                    type="date"
                    value={date_example(end_date)}
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                />
            </div>

            <button className={styles.button} onClick={create}>
                Atualizar
            </button>
        </div>
    );
}

export function TestEvent() {
    return (
        <div className={styles.container}>
            <TestCreateEvent />
            <TestGetEventById />
            <TestUpdateEvent />
        </div>
    );
}