export function Footer() {
  return (
    <footer className="bg-dark-surface text-dark-textSecondary w-full py-6 px-4 sm:px-8 mt-8">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p className="text-sm sm:text-base font-semibold">
          Todos os direitos reservados &copy; {new Date().getFullYear()} - Desenvolvido por Gerson
        </p>
      </div>
    </footer>
  );
}
