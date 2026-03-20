const FooterSection = () =>
<footer className="py-12 px-6 border-t border-border">
    <div className="container max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-gradient-viz flex items-center justify-center">
          <span className="text-xs font-bold text-primary-foreground">V</span>
        </div>
        
      </div>
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} VIZ. Todos os direitos reservados.
      </p>
    </div>
  </footer>;


export default FooterSection;