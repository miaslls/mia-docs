'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Printer, Edit3 } from 'lucide-react';

interface SectionBoxProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const SectionBox = ({ title, children, className = '' }: SectionBoxProps) => (
  <div
    className={`relative border border-gray-300 rounded-lg p-4 pt-5 mb-6 ${className}`}
  >
    <span className='absolute -top-3 left-4 bg-white px-2 text-[#005aa2] font-bold text-sm uppercase tracking-tight'>
      {title}
    </span>
    {children}
  </div>
);

const App = () => {
  const currentYearFull = new Date().getFullYear();
  const currentYearShort = String(currentYearFull).slice(-2);
  const currentMonthName = new Intl.DateTimeFormat('pt-BR', { month: 'long' })
    .format(new Date())
    .toUpperCase();

  const [formData, setFormData] = useState({
    locador: '',
    locadorSocial: '',
    locatario: '',
    locatarioSocial: '',
    logradouro: '',
    nomeImovel: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    uf: '',
    apolice: '',
    diaEntrega: '',
    mesEntrega: '',
    anoEntrega: '',
    diaFirma: '',
    mesFirma: '',
    anoFirma: currentYearShort,
    sigLocador: '',
    sigLocatario1: '',
    sigLocatario2: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

   const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 font-['Arimo'] print:bg-white print:p-0">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap');
          
          @media print {
            .no-print { display: none !important; }
            body { background-color: white; }
            .document-container { 
              box-shadow: none !important; 
              margin: 0 !important; 
              padding: 1cm 1.5cm !important;
              width: 100% !important;
              max-width: none !important;
              border: none !important;
            }
          }

          input {
            border: none;
            background: transparent;
            width: 100%;
            padding: 2px 4px;
            font-size: 0.875rem;
          }

          input:focus {
            outline: none;
            background: rgba(0, 90, 162, 0.05);
          }

          .border-inner {
            border-bottom: 1px solid #e5e7eb;
          }

          .input-solid-border {
            border-bottom: 1px solid #9ca3af !important;
          }

          .label-small {
            font-size: 10px;
            color: #4b5563;
            margin-bottom: 2px;
          }
        `}
      </style>

      {/* Action Bar */}
      <div className='max-w-4xl mx-auto mb-6 flex justify-between items-center no-print bg-white p-4 rounded-xl shadow-sm border border-gray-200'>
        <div className='flex items-center gap-3'>
          <div className='p-2 bg-blue-50 rounded-lg'>
            <Edit3 className='w-5 h-5 text-[#005aa2]' />
          </div>
          <div>
            <h1 className='text-lg font-bold text-gray-800'>
              Gerador de Recibo
            </h1>
            <p className='text-xs text-gray-500'>
              Modelo Porto Bank atualizado {currentYearFull}
            </p>
          </div>
        </div>
        <button
          onClick={handlePrint}
          className='flex items-center gap-2 bg-[#005aa2] hover:bg-[#004a85] text-white px-5 py-2 rounded-lg font-medium transition-all shadow-sm'
        >
          <Printer className='w-4 h-4' />
          <span>Imprimir Recibo</span>
        </button>
      </div>

      {/* Main Document */}
      <div className='document-container max-w-[210mm] mx-auto bg-white p-[1.5cm] shadow-2xl min-h-[297mm] flex flex-col relative text-gray-800 border border-gray-200'>
        {/* Header */}
        <div className='flex justify-between items-center mb-1'>
           <Image
             src='/porto-bank/logo.svg'
             alt='Porto Bank Logo'
             width={40}
             height={40}
             className='h-10 w-auto'
           />
          <h2 className='text-[#005aa2] font-bold text-lg tracking-tight uppercase'>
            RECIBO DE ENTREGA DE CHAVES
          </h2>
        </div>
        <div className='h-[3px] bg-[#005aa2] w-full mb-6'></div>

        <p className='font-bold text-[13px] mb-6 uppercase tracking-tight'>
          MODELO DE TERMO DE ENTREGA DE CHAVES E INEXISTÊNCIA DE DÉBITOS
        </p>

        {/* Section: Locador */}
        <SectionBox title='LOCADOR(ES)'>
          <div className='space-y-3'>
            <div className='border-inner'>
              <p className='label-small'>
                Nome(s) já qualificado(s) no preâmbulo do contrato de locação
              </p>
              <input
                type='text'
                name='locador'
                value={formData.locador}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p className='label-small'>
                Nome(s) social(is) já qualificado(s) no preâmbulo do contrato de
              </p>
              <input
                type='text'
                name='locadorSocial'
                value={formData.locadorSocial}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </SectionBox>

        {/* Section: Locatario */}
        <SectionBox title='LOCATÁRIO(S)'>
          <div className='space-y-3'>
            <div className='border-inner'>
              <p className='label-small'>
                Nome(s) já qualificado(s) no preâmbulo do contrato de locação
              </p>
              <input
                type='text'
                name='locatario'
                value={formData.locatario}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <p className='label-small'>
                Nome(s) social(is) já qualificado(s) no preâmbulo do contrato de
              </p>
              <input
                type='text'
                name='locatarioSocial'
                value={formData.locatarioSocial}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </SectionBox>

        {/* Section: Imovel */}
        <SectionBox title='IMÓVEL OBJETO DA LOCAÇÃO'>
          <div className='grid grid-cols-12 text-[11px]'>
            <div className='col-span-8 border-r border-b border-gray-300 p-2'>
              <p className='label-small'>Logradouro</p>
              <input
                type='text'
                name='logradouro'
                value={formData.logradouro}
                onChange={handleInputChange}
              />
            </div>
            <div className='col-span-4 border-b border-gray-300 p-2'>
              <p className='label-small'>Nome</p>
              <input
                type='text'
                name='nomeImovel'
                value={formData.nomeImovel}
                onChange={handleInputChange}
              />
            </div>
            <div className='col-span-2 border-r border-b border-gray-300 p-2'>
              <p className='label-small'>Nº</p>
              <input
                type='text'
                name='numero'
                value={formData.numero}
                onChange={handleInputChange}
              />
            </div>
            <div className='col-span-10 border-b border-gray-300 p-2'>
              <p className='label-small'>Complemento</p>
              <input
                type='text'
                name='complemento'
                value={formData.complemento}
                onChange={handleInputChange}
              />
            </div>
            <div className='col-span-10 border-r border-b border-gray-300 p-2'>
              <p className='label-small'>Bairro</p>
              <input
                type='text'
                name='bairro'
                value={formData.bairro}
                onChange={handleInputChange}
              />
            </div>
            <div className='col-span-2 border-b border-gray-300 p-2'></div>
            <div className='col-span-10 border-r p-2 border-gray-300'>
              <p className='label-small'>Cidade</p>
              <input
                type='text'
                name='cidade'
                value={formData.cidade}
                onChange={handleInputChange}
              />
            </div>
            <div className='col-span-2 p-2'>
              <p className='label-small'>UF</p>
              <input
                type='text'
                name='uf'
                value={formData.uf}
                onChange={handleInputChange}
                maxLength={2}
              />
            </div>
          </div>
        </SectionBox>

        {/* Declaration Main Box - Updated Styling */}
        <div className='border border-gray-200 rounded-lg p-6 text-[14px] leading-[2.2] mb-10 text-gray-700 shadow-sm'>
          <div className='flex flex-wrap items-center gap-x-2'>
            Informo que em
            <input
              type='text'
              className='w-10 input-solid-border text-center'
              name='diaEntrega'
              value={formData.diaEntrega}
              onChange={handleInputChange}
            />{' '}
            /
            <input
              type='text'
              className='w-10 input-solid-border text-center'
              name='mesEntrega'
              value={formData.mesEntrega}
              onChange={handleInputChange}
            />{' '}
            /
            <input
              type='text'
              className='w-16 input-solid-border text-center'
              name='anoEntrega'
              value={formData.anoEntrega}
              onChange={handleInputChange}
            />
            o(s) locatário(s) acima identificado(s) entregou(aram) as chaves do
            imóvel locado no estado em que o recebeu.
          </div>

          <p className='mt-4'>
            Declaro ainda que todas as obrigações contratuais foram cumpridas
            pelas partes, não restando nenhum débito, motivo pelo qual outorgam,
            LOCADOR e LOCATÁRIO, plena e total quitação das verbas rescisórias.
          </p>

          <div className='mt-4 flex flex-wrap items-center gap-x-2'>
            Diantes do exposto, autorizo o cancelamento da apólice
            <input
              type='text'
              className='flex-1 min-w-[200px] input-solid-border px-2'
              name='apolice'
              value={formData.apolice}
              onChange={handleInputChange}
            />
            a partir da data em que as chaves foram entregues.
          </div>

          <div className='mt-10 flex items-center gap-x-2'>
            <input
              type='text'
              className='w-12 input-solid-border text-center'
              name='diaFirma'
              value={formData.diaFirma}
              onChange={handleInputChange}
            />
            de
            <input
              type='text'
              className='w-48 input-solid-border px-2'
              name='mesFirma'
              value={formData.mesFirma}
              onChange={handleInputChange}
            />
            de 20
            <input
              type='text'
              className='w-10 input-solid-border text-center'
              name='anoFirma'
              value={formData.anoFirma}
              onChange={handleInputChange}
            />
            .
          </div>
        </div>

        {/* Signatures - Updated with inputs */}
        <div className='mt-auto'>
          <div className='grid grid-cols-2 gap-x-12 gap-y-16 mb-12 px-8'>
            <div className='text-center flex flex-col'>
              <input
                type='text'
                name='sigLocador'
                value={formData.sigLocador}
                onChange={handleInputChange}
                className='input-solid-border text-center mb-1'
                placeholder='Nome do Locador'
              />
              <p className='text-[11px] text-gray-500 font-bold uppercase tracking-wider'>
                Locador
              </p>
            </div>
            <div className='text-center flex flex-col'>
              <input
                type='text'
                name='sigLocatario1'
                value={formData.sigLocatario1}
                onChange={handleInputChange}
                className='input-solid-border text-center mb-1'
                placeholder='Nome do Locatário'
              />
              <p className='text-[11px] text-gray-500 font-bold uppercase tracking-wider'>
                Locatário
              </p>
            </div>
          </div>
          <div className='flex justify-center px-8'>
            <div className='w-1/2 text-center flex flex-col'>
              <input
                type='text'
                name='sigLocatario2'
                value={formData.sigLocatario2}
                onChange={handleInputChange}
                className='input-solid-border text-center mb-1'
                placeholder='Nome do Locatário'
              />
              <p className='text-[11px] text-gray-500 font-bold uppercase tracking-wider'>
                Locatário
              </p>
            </div>
          </div>
        </div>

        {/* Footer Meta - Updated per instructions */}
        <div className='mt-12 flex justify-between text-[10px] text-gray-400 font-medium'>
          <span className='uppercase'>
            {currentMonthName} / {currentYearFull}
          </span>
          <span>Página 1</span>
        </div>
      </div>

      <p className='max-w-4xl mx-auto mt-6 text-center text-gray-400 text-[10px] no-print italic'>
        Documento gerado digitalmente para fins de formalização de entrega de
        chaves - Porto Bank.
      </p>
    </div>
  );
};

export default App;
