import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Termos = () => {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <article className="max-w-3xl mx-auto prose prose-invert">
        <Link to="/auth" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 no-underline">
          <ArrowLeft className="h-4 w-4 mr-2" /> Voltar
        </Link>
        <h1>Termos & Condições e Política de Privacidade</h1>
        <p className="text-muted-foreground">Última atualização: maio de 2026</p>

        <h2>1. Aceitação</h2>
        <p>Ao criar uma conta na VIZ Super App aceita os presentes termos. Se não concordar, não utilize o serviço.</p>

        <h2>2. Conta e segurança</h2>
        <p>É responsável pelas credenciais e por toda a atividade na sua conta. Usamos confirmação por email para validar a sua identidade.</p>

        <h2>3. Tratamento de dados</h2>
        <p>
          Os dados pessoais (nome, email, telefone, documentos) são tratados ao abrigo do RGPD para prestar os serviços
          solicitados, comunicar consigo e dar cumprimento a obrigações legais. Não vendemos dados a terceiros.
        </p>

        <h2>4. Documentos enviados</h2>
        <p>Os documentos que carrega são armazenados em ambiente cifrado e apenas acessíveis a si e à equipa autorizada da VIZ.</p>

        <h2>5. Os seus direitos</h2>
        <p>Pode aceder, corrigir, exportar ou eliminar os seus dados a qualquer momento contactando privacy@viz-superapp.pt.</p>

        <h2>6. Cookies</h2>
        <p>Usamos cookies estritamente necessários para autenticação e preferências. Não usamos cookies de marketing sem consentimento.</p>

        <h2>7. Alterações</h2>
        <p>Podemos atualizar estes termos. Notificaremos alterações relevantes por email.</p>

        <p className="text-sm text-muted-foreground mt-8">
          Este é um texto base. Substitua pelo documento jurídico final antes de produção.
        </p>
      </article>
    </main>
  );
};

export default Termos;
