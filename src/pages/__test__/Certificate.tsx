import { useState } from 'react';
import { useListCertificateByUserId } from '@/hooks/Certificate/useListCertificate';
import { useAuthStoreData } from '@/stores/useAuthStore';
import { useCreateCertificate } from '@/hooks/Certificate/useCreateCertificate';
import { useCheckAvailableCertificate } from '@/hooks/Certificate/useCheckAvailable';
import { useValidateCertificate } from '@/hooks/Certificate/useValidateCertificate';

import type { CertificateRequest } from '@/api/@types';
import styles from './Test.module.css';

function TestListCertificate() {
    const { data, isLoading, isSuccess, refetch, error } = useListCertificateByUserId();
    const { auth } = useAuthStoreData();

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Listar Certificados do Usuário</h3>

            <div className={styles.field}>
                <span className={styles.label}>Auth Store Data</span>
                <div className={styles.responseBox}>
                    <pre className={styles.codeOutput}>{JSON.stringify(auth, null, 2)}</pre>
                </div>
            </div>

            <button className={styles.button} onClick={() => refetch()}>
                Atualizar Lista
            </button>

            <div className={styles.field}>
                <span className={styles.label}>Resultado</span>
                <div className={styles.responseBox}>
                    {isLoading ? (
                        <span>Carregando...</span>
                    ) : !isSuccess ? (
                        <span>Erro: {error?.message}</span>
                    ) : (
                        <pre className={styles.codeOutput}>{JSON.stringify(data, null, 2)}</pre>
                    )}
                </div>
            </div>
        </div>
    );
}

function TestCreateCertificate() {
    const { mutate } = useCreateCertificate();

    const [id_user, setIdUser] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [event, setEvent] = useState('');

    const VITE_ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

    const create = () => {
        const formData: CertificateRequest = {
            fullname: name,
            email: email,
            event_id: event,
            access_key: VITE_ACCESS_KEY,
            status: "pending"
        };

        mutate({ userId: id_user, certificate_data: formData });
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Criar Certificado</h3>

            <div className={styles.field}>
                <label className={styles.label}>ID do Usuário</label>
                <input
                    className={styles.input}
                    type="text"
                    value={id_user}
                    onChange={(e) => setIdUser(e.target.value)}
                    placeholder="ID do Usuário"
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Nome Completo</label>
                <input
                    className={styles.input}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nome completo"
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>E-mail</label>
                <input
                    className={styles.input}
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>ID do Evento</label>
                <input
                    className={styles.input}
                    type="text"
                    value={event}
                    onChange={(e) => setEvent(e.target.value)}
                    placeholder="ID do Evento"
                />
            </div>

            <button className={styles.button} onClick={create}>
                Criar Certificado
            </button>
        </div>
    );
}

function TestGetCertificate() {
    const [idCertificate, setIdCertificate] = useState('');
    const { data, isLoading, isError, error } = useCheckAvailableCertificate(idCertificate);

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Verificar Disponibilidade do Certificado</h3>

            <div className={styles.field}>
                <label className={styles.label}>ID do Certificado</label>
                <input
                    className={styles.input}
                    type="text"
                    value={idCertificate}
                    onChange={(e) => setIdCertificate(e.target.value)}
                    placeholder="Insira o ID do Certificado"
                />
            </div>

            <div className={styles.responseBox}>
                {isLoading ? (
                    <span>Carregando...</span>
                ) : isError ? (
                    <span>Erro: {error?.message}</span>
                ) : (
                    <pre className={styles.codeOutput}>{JSON.stringify(data, null, 2)}</pre>
                )}
            </div>
        </div>
    );
}

function TestValidateCertificate() {
    const [accessKey, setAccessKey] = useState('');
    const { data, isLoading, isError, error } = useValidateCertificate(accessKey);

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Validar Certificado por Chave</h3>

            <div className={styles.field}>
                <label className={styles.label}>Chave de Acesso</label>
                <input
                    className={styles.input}
                    type="text"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                    placeholder="Insira a Access Key"
                />
            </div>

            <div className={styles.responseBox}>
                {isLoading ? (
                    <span>Carregando...</span>
                ) : isError ? (
                    <span>Erro: {error?.message}</span>
                ) : (
                    <pre className={styles.codeOutput}>{JSON.stringify(data, null, 2)}</pre>
                )}
            </div>
        </div>
    );
}

export function TestCertificate() {
    return (
        <div className={styles.container}>
            <TestListCertificate />
            <TestCreateCertificate />
            <TestGetCertificate />
            <TestValidateCertificate />
        </div>
    );
}