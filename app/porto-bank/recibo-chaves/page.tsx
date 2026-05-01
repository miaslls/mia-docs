'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes } from 'react';
import { Plus, Printer, RotateCcw } from 'lucide-react';

type FormValues = {
  locador: string;
  locadorSocial: string;
  locatario: string;
  locatarioSocial: string;
  logradouro: string;
  nomeImovel: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  diaEntrega: string;
  mesEntrega: string;
  anoEntrega: string;
  apolice: string;
  diaFirma: string;
  mesFirma: string;
  anoFirma: string;
  sigLocador: string;
  sigLocatario1: string;
  sigLocatario2: string;
};

type LineInputProps = InputHTMLAttributes<HTMLInputElement> & {
  widthClass: string;
  center?: boolean;
};

type EditableTextProps = {
  value: string;
  onChange: (value: string) => void;
  defaultValue: string;
  className?: string;
};

const CellInput = ({
  className = '',
  onFocus,
  onClick,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    onFocus={(e) => {
      onFocus?.(e);
      e.currentTarget.select();
    }}
    onClick={(e) => {
      onClick?.(e);
      e.currentTarget.select();
    }}
    className={`cell-input ${className}`.trim()}
  />
);

const EditableText = ({
  value,
  onChange,
  defaultValue,
  className = '',
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const isEmpty = value.trim().length === 0;

  if (!isEditing && isEmpty) {
    return (
      <button
        type='button'
        onClick={() => onChange(defaultValue)}
        className='inline-flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-[#2c49b4] hover:bg-[#eef2ff]'
        aria-label='Restaurar texto'
      >
        <Plus className='h-3 w-3' />
      </button>
    );
  }

  return (
    <span
      contentEditable={isEditing}
      suppressContentEditableWarning
      onClick={() => setIsEditing(true)}
      onBlur={() => setIsEditing(false)}
      onInput={(e) => onChange(e.currentTarget.textContent ?? '')}
      className={`editable-text ${className} ${isEditing ? 'rounded-sm bg-[#2c49b40d] px-0.5' : ''}`.trim()}
    >
      {value}
    </span>
  );
};

const LineInput = ({
  widthClass,
  center = false,
  className = '',
  ...props
}: LineInputProps) => (
  <input
    {...props}
    onFocus={(e) => {
      props.onFocus?.(e);
      e.currentTarget.select();
    }}
    onClick={(e) => {
      props.onClick?.(e);
      e.currentTarget.select();
    }}
    className={`line-input ${widthClass} ${center ? 'text-center' : ''} ${className}`.trim()}
  />
);

const SectionFrame = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className='relative mt-5 rounded-md border border-gray-300'>
    <h3 className='absolute -top-[10px] left-3 bg-white px-2 text-[16px] font-bold uppercase leading-none text-[#2c49b4]'>
      {title}
    </h3>
    {children}
  </section>
);

export default function Page() {
  const today = new Date();
  const currentDay = String(today.getDate()).padStart(2, '0');
  const currentMonthNumber = String(today.getMonth() + 1).padStart(2, '0');
  const currentMonthName = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
  }).format(today);
  const currentYearFull = String(today.getFullYear());
  const currentYearShort = currentYearFull.slice(-2);

  const initialForm: FormValues = {
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
    diaEntrega: currentDay,
    mesEntrega: currentMonthNumber,
    anoEntrega: currentYearFull,
    apolice: '',
    diaFirma: currentDay,
    mesFirma: currentMonthName,
    anoFirma: currentYearShort,
    sigLocador: '',
    sigLocatario1: '',
    sigLocatario2: '',
  };

  const initialDeclarationText = {
    introPrefix: 'Informo que em',
    introSuffix:
      'o(s) locatário(s) acima identificado(s) entregou(aram) as chaves do imóvel locado no estado em que o recebeu.',
    quitClaim:
      'Declaro ainda que todas as obrigações contratuais foram cumpridas pelas partes, não restando nenhum débito, motivo pelo qual outorgam, LOCADOR e LOCATÁRIO, plena e total quitação das verbas rescisórias.',
    cancelPrefix: 'Diantes do exposto, autorizo o cancelamento da apólice',
    cancelSuffix: 'a partir da data em que as chaves foram entregues.',
  };

  const [form, setForm] = useState<FormValues>(initialForm);
  const [declarationText, setDeclarationText] = useState(
    initialDeclarationText,
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleReset = () => {
    setForm(initialForm);
    setDeclarationText(initialDeclarationText);
  };

  return (
    <div className='page-shell min-h-screen bg-[#ececec] px-2 py-5 print:bg-white print:p-0'>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&display=swap');

        .doc {
          font-family: 'Arimo', sans-serif;
        }

        .cell-input {
          width: 100%;
          border: none;
          background: transparent;
          font-size: 14px;
          line-height: 1.2;
          padding: 0;
          margin-top: 2px;
        }

        .cell-input:focus {
          outline: none;
          background: rgba(44, 73, 180, 0.04);
        }

        .cell-input:hover {
          background: rgba(44, 73, 180, 0.08);
        }

        .line-input {
          border: none;
          border-bottom: 1px solid #9ca3af;
          background: transparent;
          font-size: 14px;
          line-height: 1.2;
          height: 20px;
          padding: 0 2px;
        }

        .line-input:focus {
          outline: none;
          background: rgba(44, 73, 180, 0.04);
        }

        .line-input:hover {
          background: rgba(44, 73, 180, 0.08);
        }

        .editable-text {
          cursor: text;
          transition: background-color 120ms ease;
        }

        .editable-text:hover {
          background: rgba(44, 73, 180, 0.08);
          border-radius: 2px;
        }

        .cut-row {
          position: relative;
        }

        .cut-row::after {
          content: '';
          position: absolute;
          left: 8px;
          right: 8px;
          bottom: 0;
          height: 0;
          border-bottom: 1px solid #d1d5db;
        }

        .cut-vline {
          position: relative;
        }

        .cut-vline::after {
          content: '';
          position: absolute;
          right: 0;
          top: 4px;
          bottom: 0;
          width: 0;
          border-right: 1px solid #d1d5db;
        }

        @media print {
          .no-print {
            display: none !important;
          }

          .doc {
            margin: 0 !important;
            max-width: none !important;
            min-height: auto !important;
            width: 100% !important;
            border: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <div className='mx-auto w-full max-w-[210mm]'>
        <div className='no-print mb-3 flex justify-end gap-2'>
          <button
            type='button'
            onClick={handleReset}
            className='inline-flex items-center gap-2 rounded-md border border-[#2c49b4] bg-white px-4 py-2 text-sm font-bold text-[#2c49b4] hover:bg-[#eef2ff]'
          >
            <RotateCcw className='h-4 w-4' />
            Resetar
          </button>
          <button
            type='button'
            onClick={handlePrint}
            className='inline-flex items-center gap-2 rounded-md bg-[#2c49b4] px-4 py-2 text-sm font-bold text-white hover:bg-[#243f9b]'
          >
            <Printer className='h-4 w-4' />
            Imprimir
          </button>
        </div>

        <div className='doc min-h-[297mm] w-full border border-gray-200 bg-white px-5 py-5 text-[14px] text-[#222] shadow-sm'>
          <header className='flex items-center justify-between'>
            <Image
              src='/porto-bank/logo.svg'
              alt='Porto Bank'
              width={180}
              height={38}
              className='h-10 w-auto'
              priority
            />
            <h1 className='text-[22px] font-bold uppercase tracking-tight text-[#2c49b4]'>
              Recibo de Entrega de Chaves
            </h1>
          </header>

          <div className='mt-3 h-[3px] w-full bg-[#2c49b4]' />

          <p className='mt-4 text-[14px] font-bold uppercase'>
            Termo de Entrega de Chaves e Inexistência de Débitos
          </p>

          <SectionFrame title='Locador(es)'>
            <div className='px-2 py-2'>
              <div className='border-b border-gray-300 pb-2'>
                <p className='leading-tight'>
                  Nome(s) já qualificado(s) no preâmbulo do contrato de locação
                </p>
                <CellInput
                  name='locador'
                  value={form.locador}
                  onChange={handleChange}
                />
              </div>
              <div className='pt-2'>
                <p className='leading-tight'>
                  Nome(s) social(is) já qualificado(s) no preâmbulo do contrato
                  de
                </p>
                <CellInput
                  name='locadorSocial'
                  value={form.locadorSocial}
                  onChange={handleChange}
                />
              </div>
            </div>
          </SectionFrame>

          <SectionFrame title='Locatário(s)'>
            <div className='px-2 py-2'>
              <div className='border-b border-gray-300 pb-2'>
                <p className='leading-tight'>
                  Nome(s) já qualificado(s) no preâmbulo do contrato de locação
                </p>
                <CellInput
                  name='locatario'
                  value={form.locatario}
                  onChange={handleChange}
                />
              </div>
              <div className='pt-2'>
                <p className='leading-tight'>
                  Nome(s) social(is) já qualificado(s) no preâmbulo do contrato
                  de
                </p>
                <CellInput
                  name='locatarioSocial'
                  value={form.locatarioSocial}
                  onChange={handleChange}
                />
              </div>
            </div>
          </SectionFrame>

          <SectionFrame title='Imóvel Objeto da Locação'>
            <div className='text-[14px]'>
              <div className='cut-row grid grid-cols-12'>
                <div className='cut-vline col-span-7 px-2 py-2'>
                  <p>Logradouro</p>
                  <CellInput
                    name='logradouro'
                    value={form.logradouro}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-span-5 px-2 py-2'>
                  <p>Nome</p>
                  <CellInput
                    name='nomeImovel'
                    value={form.nomeImovel}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='cut-row grid grid-cols-12'>
                <div className='cut-vline col-span-2 px-2 py-2'>
                  <p>Nº</p>
                  <CellInput
                    name='numero'
                    value={form.numero}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-span-10 px-2 py-2'>
                  <p>Complemento</p>
                  <CellInput
                    name='complemento'
                    value={form.complemento}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className='cut-row grid grid-cols-12'>
                <div className='cut-vline col-span-11 px-2 py-2'>
                  <p>Bairro</p>
                  <CellInput
                    name='bairro'
                    value={form.bairro}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-span-1 px-2 py-2' />
              </div>

              <div className='grid grid-cols-12'>
                <div className='cut-vline col-span-11 px-2 py-2'>
                  <p>Cidade</p>
                  <CellInput
                    name='cidade'
                    value={form.cidade}
                    onChange={handleChange}
                  />
                </div>
                <div className='col-span-1 px-2 py-2'>
                  <p>UF</p>
                  <CellInput
                    name='uf'
                    value={form.uf}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </SectionFrame>

          <section className='mt-6 rounded-md border border-gray-300 px-2 pt-2 pb-5 leading-[1.35]'>
            <p>
              <EditableText
                value={declarationText.introPrefix}
                defaultValue={initialDeclarationText.introPrefix}
                onChange={(value) =>
                  setDeclarationText((prev) => ({
                    ...prev,
                    introPrefix: value,
                  }))
                }
              />{' '}
              <LineInput
                name='diaEntrega'
                value={form.diaEntrega}
                onChange={handleChange}
                widthClass='w-10'
                center
              />{' '}
              /{' '}
              <LineInput
                name='mesEntrega'
                value={form.mesEntrega}
                onChange={handleChange}
                widthClass='w-10'
                center
              />{' '}
              /{' '}
              <LineInput
                name='anoEntrega'
                value={form.anoEntrega}
                onChange={handleChange}
                widthClass='w-12'
                center
              />{' '}
              <EditableText
                value={declarationText.introSuffix}
                defaultValue={initialDeclarationText.introSuffix}
                onChange={(value) =>
                  setDeclarationText((prev) => ({
                    ...prev,
                    introSuffix: value,
                  }))
                }
              />
            </p>

            <p className='mt-2'>
              <EditableText
                value={declarationText.quitClaim}
                defaultValue={initialDeclarationText.quitClaim}
                onChange={(value) =>
                  setDeclarationText((prev) => ({ ...prev, quitClaim: value }))
                }
              />
            </p>

            <p className='mt-1'>
              <EditableText
                value={declarationText.cancelPrefix}
                defaultValue={initialDeclarationText.cancelPrefix}
                onChange={(value) =>
                  setDeclarationText((prev) => ({
                    ...prev,
                    cancelPrefix: value,
                  }))
                }
              />{' '}
              <LineInput
                name='apolice'
                value={form.apolice}
                onChange={handleChange}
                widthClass='w-[200px]'
              />{' '}
              <EditableText
                value={declarationText.cancelSuffix}
                defaultValue={initialDeclarationText.cancelSuffix}
                onChange={(value) =>
                  setDeclarationText((prev) => ({
                    ...prev,
                    cancelSuffix: value,
                  }))
                }
              />
            </p>

            <div className='mt-4 flex items-end gap-x-2'>
              <LineInput
                name='diaFirma'
                value={form.diaFirma}
                onChange={handleChange}
                widthClass='w-[120px]'
                center
              />
              <span>de</span>
              <LineInput
                name='mesFirma'
                value={form.mesFirma}
                onChange={handleChange}
                widthClass='w-[180px]'
                center
              />
              <span>de 20</span>
              <LineInput
                name='anoFirma'
                value={form.anoFirma}
                onChange={handleChange}
                widthClass='w-[56px]'
                center
              />
              <span>.</span>
            </div>
          </section>

          <section className='mt-10'>
            <div className='grid grid-cols-2 gap-x-10'>
              <div className='flex flex-col items-center'>
                <LineInput
                  name='sigLocador'
                  value={form.sigLocador}
                  onChange={handleChange}
                  widthClass='w-[260px]'
                  center
                />
                <p className='mt-1 text-[14px]'>Locador</p>
              </div>

              <div className='flex flex-col items-center'>
                <LineInput
                  name='sigLocatario1'
                  value={form.sigLocatario1}
                  onChange={handleChange}
                  widthClass='w-[260px]'
                  center
                />
                <p className='mt-1 text-[14px]'>Locatário</p>
              </div>
            </div>

            <div className='mt-8 flex justify-center'>
              <div className='flex flex-col items-center'>
                <LineInput
                  name='sigLocatario2'
                  value={form.sigLocatario2}
                  onChange={handleChange}
                  widthClass='w-[260px]'
                  center
                />
                <p className='mt-1 text-[14px]'>Locatário</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
