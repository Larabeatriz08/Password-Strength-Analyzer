"use client";

import { useEffect, useState } from "react";

import {
  ShieldCheck,
  TriangleAlert,
  LockKeyhole,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff
} from "lucide-react";

import { motion } from "framer-motion";

export default function Home() {
  const [password, setPassword] = useState("");
  const [typedText, setTypedText] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

    let strength = "";
    let color = "from-transparent to-transparent";
    let width = "0%";

    if (password.length > 0) {
      strength = "Fraca";
      color = "from-red-500 to-red-400";
      width = "25%";
    }

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
    <main className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 py-10 overflow-x-hidden">
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-3">
          <ShieldCheck className="text-cyan-400" size={34} />

          <h1 className="text-3xl md:text-4xl font-bold min-h-[48px]">
            {typedText}
          </h1>
        </div>

        <p className="text-zinc-400 mb-8">
          Analise a força da sua senha em tempo real com indicadores modernos de segurança.
        </p>

        <div className="space-y-5">
          <div className="relative">
            <LockKeyhole
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              size={20}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-cyan-400 transition"
            >
              {
                showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )
              }
            </button>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-12 pr-12 py-4 outline-none focus:border-cyan-400/40 transition text-sm md:text-base"
            />
          </div>

          <div className="w-full h-4 bg-[#1a1a1a] rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${analysis.color} rounded-full shadow-lg`}
              animate={{ width: analysis.width }}
              transition={{ duration: 0.6 }}
            ></motion.div>
          </div>

          <div className="flex justify-between text-sm text-zinc-400">
            <span>Força da senha</span>
            <span>{analysis.strength}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5 transition-all duration-300"
            >
              <p className="text-zinc-400 text-sm mb-1">
                Tempo estimado de quebra
              </p>

              <h2 className="text-lg font-semibold">
                {analysis.crackTime}
              </h2>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#1a1a1a] rounded-2xl p-4 border border-white/5 transition-all duration-300"
            >
              <p className="text-zinc-400 text-sm mb-1">
                Entropia da senha
              </p>

              <h2 className="text-lg font-semibold">
                {analysis.entropy} bits
              </h2>
            </motion.div>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-white/5 transition-all duration-300">
            <h3 className="text-lg font-semibold mb-4">
              Análise de segurança
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span>Letras maiúsculas</span>

                {
                  analysis.hasUppercase ? (
                    <CheckCircle2 className="text-green-400" size={20} />
                  ) : (
                    <XCircle className="text-red-400" size={20} />
                  )
                }
              </div>

              <div className="flex items-center justify-between">
                <span>Letras minúsculas</span>

                {
                  analysis.hasLowercase ? (
                    <CheckCircle2 className="text-green-400" size={20} />
                  ) : (
                    <XCircle className="text-red-400" size={20} />
                  )
                }
              </div>

              <div className="flex items-center justify-between">
                <span>Números</span>

                {
                  analysis.hasNumber ? (
                    <CheckCircle2 className="text-green-400" size={20} />
                  ) : (
                    <XCircle className="text-red-400" size={20} />
                  )
                }
              </div>

              <div className="flex items-center justify-between">
                <span>Caracteres especiais</span>

                {
                  analysis.hasSpecial ? (
                    <CheckCircle2 className="text-green-400" size={20} />
                  ) : (
                    <XCircle className="text-red-400" size={20} />
                  )
                }
              </div>

              <div className="flex items-center justify-between">
                <span>Senha vazada</span>

                {
                  analysis.leaked ? (
                    <TriangleAlert className="text-red-400" size={20} />
                  ) : (
                    <CheckCircle2 className="text-green-400" size={20} />
                  )
                }
              </div>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-white/5 transition-all duration-300">
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

          <div className="bg-[#1a1a1a] rounded-2xl p-5 border border-white/5 transition-all duration-300">
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
      </motion.div>
    </main>
  );
}