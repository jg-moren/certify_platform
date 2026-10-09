import { useState } from 'react';
import { useLoginAuth } from '@/hooks/Auth/useLoginAuth';
import type { LoginSchemaType } from '@/schemas/Login';
import { useAuthStoreData } from '@/stores/useAuthStore';
import styles from './Test.module.css';
import { useAuthSignUp } from '@/hooks/Auth/useAuthSignUp';
import type { AuthSignUp } from '@/api/@types';

export function TestLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { mutate } = useLoginAuth();
    const { auth } = useAuthStoreData();

    const onSubmit = () => {
        const formData: LoginSchemaType = {
            email: email,
            password: password,
        };

        mutate(formData);
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Autenticação (Login)</h3>

            <div className={styles.field}>
                <span className={styles.label}>AuthStore Data</span>
                <div className={styles.responseBox}>
                    <pre className={styles.codeOutput}>
                        {JSON.stringify(auth, null, 2)}
                    </pre>
                </div>
            </div>

            <div className={styles.field}>
                <label className={styles.label}>E-mail</label>
                <input
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Senha</label>
                <input
                    className={styles.input}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                />
            </div>

            <button className={styles.button} onClick={onSubmit}>
                Entrar
            </button>
        </div>
    );
}

export function TestSignUp() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { mutate } = useAuthSignUp();

    const onSubmit = () => {
        const formData: AuthSignUp = {
            fullname: nome,
            email: email,
            password: password,
            role: "user"
        };

        mutate(formData);
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Autenticação (SignUp)</h3>

            <div className={styles.field}>
                <label className={styles.label}>Nome</label>
                <input
                    className={styles.input}
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu Nome"
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>E-mail</label>
                <input
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label}>Senha</label>
                <input
                    className={styles.input}
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Sua senha"
                />
            </div>

            <button className={styles.button} onClick={onSubmit}>
                Entrar
            </button>
        </div>
    );
}

export function TestLogout() {
    const { authLogout } = useAuthStoreData();

    return (
        <div className={styles.card}>
            <h3 className={styles.title}>Encerrar Sessão</h3>
            <button className={styles.button} onClick={authLogout}>
                Sair
            </button>
        </div>
    );
}

export function TestAuth() {
    return (
        <div className={styles.container}>
            <TestLogin />
            <TestLogout />
            <TestSignUp />
        </div>
    );
}