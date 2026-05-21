"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [typedText, setTypedText] = useState("");

  const title = "Password Strength Analyzer";

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      setTypedText(title.slice(0, index));
      index++;

      if (index > title.length) {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, []);

  function analyzePassword() {
    let score = 0;

    const suggestions = [];
    const vulnerabilities = [];

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    const commonWords = [
      "123456",
      "password",
      "admin",
      "qwerty",
      "senha"
    ];

    const repeatedPattern = /(.)\1{2,}/.test(password);

    if (password.length >= 8) score++;
    else suggestions.push("Use pelo menos 8 caracteres.");

    if (password.length >= 12) score++;

    if (hasUppercase) score++;
    else suggestions.push("Adicione letras maiúsculas.");

    if (hasLowercase) score++;

    if (hasNumber) score++;
    else suggestions.push("Adicione números.");

    if (hasSpecial) score++;
    else suggestions.push("Adicione caracteres especiais.");

    if (repeatedPattern) {
      vulnerabilities.push("Caracteres repetidos detectados.");
    }

    for (let i = 0; i < commonWords.length; i++) {
      if (password.toLowerCase().includes(commonWords[i])) {
        vulnerabilities.push("Padrão de senha comum detectado.");
      }
    }

    const leakedPasswords = [
      "123456",
      "password123",
      "admin123",
      "qwerty123"
    ];

    let leaked = false;

    for (let i = 0; i < leakedPasswords.length; i++) {
      if (password.toLowerCase() === leakedPasswords[i]) {
        leaked = true;
      }
    }

    let strength = "Fraca";
    let color = "from-red-500 to-red-400";
    let width = "25%";

    if (score >= 3) {
      strength = "Média";
      color = "from-yellow-500 to-orange-400";
      width = "50%";
    }

    if (score >= 5) {
      strength = "Forte";
      color = "from-green-500 to-emerald-400";
      width = "75%";
    }

    if (score >= 6 && password.length >= 12) {
      strength = "Muito Forte";
      color = "from-cyan-400 to-blue-500";
      width = "100%";
    }

    let entropy = password.length * 4;

    let crackTime = "Instantaneamente";

    if (password.length >= 4) {
      crackTime = "3 minutos";
    }

    if (password.length >= 6) {
      crackTime = "5 horas";
    }

    if (password.length >= 8) {
      crackTime = "12 dias";
    }

    if (password.length >= 10) {
      crackTime = "8 meses";
    }

    if (password.length >= 12) {
      crackTime = "14 anos";
    }

    if (
      password.length >= 14 &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecial
    ) {
      crackTime = "327 anos";
    }

    if (
      password.length >= 18 &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecial
    ) {
      crackTime = "12 mil anos";
    }

    return {
      strength,
      color,
      width,
      entropy,
      crackTime,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecial,
      leaked,
      vulnerabilities,
      suggestions
    };
  }

  const analysis = analyzePassword();

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl bg-[#111111] border border-white/10 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold mb-3 min-h-[48px]">
          {typedText}
        </h1>

        <p className="text-zinc-400 mb-8">
          Analise a força da sua senha em tempo real com indicadores modernos de segurança.
        </p>

        <div className="space-y-5">
          <input
            type="password"
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-4 outline-none focus:border-white/30 transition"
          />

          <div className="w-full h-4 bg-[#1a1a1a] rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${analysis.color} rounded-full transition-all duration-700 ease-in-out shadow-lg`}
              style={{ width: analysis.width }}
            ></div>
          </div>

          <div className="flex justify-between text-sm text-zinc-400">
            <span>Força da senha</span>
            <span>{analysis.strength}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5">
              <p className="text-zinc-400 text-sm mb-1">
                Tempo estimado de quebra
              </p>

              <h2 className="text-lg font-semibold">
                {analysis.crackTime}
              </h2>
            </div>

            <div className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5">
              <p className="text-zinc-400 text-sm mb-1">
                Entropia da senha
              </p>

              <h2 className="text-lg font-semibold">
                {analysis.entropy} bits
              </h2>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-white/5">
            <h3 className="text-lg font-semibold mb-4">
              Análise de segurança
            </h3>

            <div className="space-y-2 text-sm">
              <p>
                Letras maiúsculas:
                {" "}
                <span className={analysis.hasUppercase ? "text-green-400" : "text-red-400"}>
                  {analysis.hasUppercase ? "Yes" : "No"}
                </span>
              </p>

              <p>
                Letras minúsculas:
                {" "}
                <span className={analysis.hasLowercase ? "text-green-400" : "text-red-400"}>
                  {analysis.hasLowercase ? "Yes" : "No"}
                </span>
              </p>

              <p>
                Números:
                {" "}
                <span className={analysis.hasNumber ? "text-green-400" : "text-red-400"}>
                  {analysis.hasNumber ? "Yes" : "No"}
                </span>
              </p>

              <p>
                Caracteres especiais:
                {" "}
                <span className={analysis.hasSpecial ? "text-green-400" : "text-red-400"}>
                  {analysis.hasSpecial ? "Yes" : "No"}
                </span>
              </p>

              <p>
                Vazamento detectado:
                {" "}
                <span className={analysis.leaked ? "text-red-400" : "text-green-400"}>
                  {analysis.leaked ? "Yes" : "No"}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-white/5">
            <h3 className="text-lg font-semibold mb-4">
              Vulnerabilidades
            </h3>

            {
              analysis.vulnerabilities.length === 0 ? (
                <p className="text-sm text-green-400">
                  Nenhuma vulnerabilidade importante detectada.
                </p>
              ) : (
                <ul className="space-y-2 text-sm text-red-400">
                  {
                    analysis.vulnerabilities.map((item, index) => (
                      <li key={index}>
                        • {item}
                      </li>
                    ))
                  }
                </ul>
              )
            }
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-white/5">
            <h3 className="text-lg font-semibold mb-4">
              Sugestões
            </h3>

            {
              analysis.suggestions.length === 0 ? (
                <p className="text-sm text-green-400">
                  Excelente nível de segurança.
                </p>
              ) : (
                <ul className="space-y-2 text-sm text-yellow-400">
                  {
                    analysis.suggestions.map((item, index) => (
                      <li key={index}>
                        • {item}
                      </li>
                    ))
                  }
                </ul>
              )
            }
          </div>
        </div>
      </div>
    </main>
  );
}