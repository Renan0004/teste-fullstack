import React from 'react';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TimeRecordWithHours } from '../types';
import { useTheme } from '../styles/ThemeContext';

interface ExportButtonProps {
  timeRecords: TimeRecordWithHours[];
  userCode: string;
}

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    filter: brightness(1.1);
  }
  
  &:active {
    filter: brightness(0.9);
  }
`;

const ExportButton: React.FC<ExportButtonProps> = ({ timeRecords, userCode }) => {
  const { theme } = useTheme();
  
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    } catch (error) {
      return '';
    }
  };

  const formatTime = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    } catch (error) {
      return '';
    }
  };

  const formatHours = (hours: number, minutes: number, seconds: number): string => {
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Título do documento
    const title = `Relatório de Ponto - Usuário #${userCode}`;
    doc.setFontSize(18);
    doc.text(title, 14, 22);
    
    // Data de geração
    const today = new Date();
    const dateStr = formatDate(today.toISOString());
    doc.setFontSize(12);
    doc.text(`Gerado em: ${dateStr}`, 14, 32);
    
    // Preparar dados para a tabela
    const tableData = timeRecords.map(record => [
      formatDate(record.entry_time),
      formatTime(record.entry_time),
      record.exit_time ? formatTime(record.exit_time) : 'Em andamento',
      formatHours(
        record.workedHours.hours,
        record.workedHours.minutes,
        record.workedHours.seconds
      )
    ]);
    
    // Criar tabela
    autoTable(doc, {
      head: [['Data', 'Entrada', 'Saída', 'Tempo Total']],
      body: tableData,
      startY: 40,
      theme: theme === 'dark' ? 'grid' : 'striped',
      headStyles: {
        fillColor: [255, 128, 0],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: theme === 'dark' ? [45, 55, 65] : [240, 240, 240]
      }
    });
    
    // Rodapé
    const pageCount = doc.internal.pages.length - 1;
    doc.setFontSize(10);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        `Página ${i} de ${pageCount} - Ponto Ilumeo`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }
    
    // Salvar o PDF
    doc.save(`ponto-ilumeo-${userCode}-${Date.now()}.pdf`);
  };

  return (
    <Button onClick={handleExportPDF}>
      <span>📄</span> Exportar para PDF
    </Button>
  );
};

export default ExportButton; 