import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function formatDate(dateInString: string): string {
  const dateInDate = new Date(dateInString);
  const formattedDate = format(dateInDate, 'dd MMM yyy', {
    locale: ptBR,
  });
  return formattedDate;
}
