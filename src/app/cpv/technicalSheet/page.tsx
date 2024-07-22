"use client";
import React, {useEffect, useState, useRef} from 'react';
import { useRouter } from 'next/navigation';
import { getNewSheets } from 'app/actions/actions';
import { deleteSheet } from 'app/actions/actions';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { ConfirmPopup } from 'primereact/confirmpopup'; // To use <ConfirmPopup> tag
import { confirmPopup } from 'primereact/confirmpopup'; // To use confirmPopup method    
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog'; 
import Image from "next/image";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css';
import './style.css';

interface Image {
  id: number;
  newSheetId: number;
  url: string;
}

interface Sheets {
  id: number;
  typeTheEquipment: string;
  brand: string;
  capacity: string;
  serial: string;
  location: string;
  ifm: string | null;
  ofm: string | null;
  evaporatorOutletTemp: string | null;
  capacitorOutletTemp: string | null;
  compressorComsumption: string | null;
  equipmentComsumption: string | null;
  returnPressure: string | null;
  dischargePresure: string | null;
  refrigerantType: string | null;
  evaporatorStatus: string | null;
  capacitorStatus: string | null;
  mttoPre: string | null;
  technicalReport: string | null;
  recommendations: string | null;
  images?: Image[];
  updatedAt: Date;
}

const TechnicalSheet = () => {

  const [listSheets, setListSheets] = useState<Sheets[]>([]); // Inicializa el estado con un array vacío
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    typeTheEquipment: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    brand: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    serial: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState('');
  const [modalDelete, setModalDelete] = useState(false);
  const [deleteSheetId, setDeleteSheetId] = useState<number | null>(null);

  const [showModalSheet, setShowModalSheet] = useState<boolean>(false);
  const [selectShowModalSheet, setSelectShowModalSheet] = useState<Sheets | null>(null);

  const [selectedImage, setSelectedImage] = useState<any>(null);

  const toast = useRef<any>(null);
  const buttonEl = useRef<any>(null);

  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/cpv/technicalSheet/editSheet/${id}`);
  
  }


  useEffect(() => {
    const fetSheets = async () => {
      try {
        const getSheets = await getNewSheets();
        setListSheets(getSheets);
        console.log(getSheets, 'informacion almacenada en getSheets')
      } catch (error) {
        console.error(error); 
    }};
    fetSheets();
  }, []);

    //actions for buttons 

    const handleDelete = async (id: number) => {
        try {
          await deleteSheet(id);
          setListSheets(listSheets.filter((sheet) => sheet.id !== id));
          console.log('Product eliminado', id);
          setDeleteSheetId(null);
        } catch (error) {
          console.error(error, 'error al eliminar el producto ');
        }
    }

    const confirm = () => {
        if (deleteSheetId !== null) {
        handleDelete(deleteSheetId);
        toast.current.show({ severity: 'info', summary: 'Exitoso', detail: 'Ficha eliminada exitosamente', life: 3000 });
      } else {
        console.log('hubo un error')
      }
    }

    const reject = () => {
      toast.current.show({ severity: 'warn', summary: 'Exitoso', detail: 'Eliminacion de ficha cancelada', life: 3000 });
    };

    //function to show details of the sheet
    const handleShowSheetDetails = (id: number) => {
      const sheet = listSheets.find((sheet) => sheet.id === id);
      console.log(sheet, 'informacion almacenada en sheet')
      setSelectShowModalSheet(sheet ?? null);
    }

    
    //Template for actions
    const actionBodyTemplate = (rowData: Sheets) => {
    return (
      <React.Fragment>
        <div className='flex gap-5'>
          <button onClick={() => {setShowModalSheet(true); handleShowSheetDetails(rowData.id) }}>
            <i className="pi pi-eye" style={{ color: '#15DF2E', fontSize: '1.3rem' }}></i>
          </button>
          <button onClick={() => handleEdit(rowData.id)}>
            <i className="pi pi-pencil" style={{ color: '#15D3DF', fontSize: '1.2rem' }}></i>
          </button>
          <Toast ref={toast} />
          <ConfirmPopup target={buttonEl.current} visible={modalDelete} onHide={() => setModalDelete(false)} 
              message="¿Estas seguro de eliminar la ficha tecnica?" icon="pi pi-exclamation-triangle" accept={confirm} reject={reject} />
          <button className="card flex justify-content-center">
              <i ref={buttonEl} onClick={() => {setModalDelete(true); setDeleteSheetId(rowData.id) }} className="pi pi-trash flex gap-2" style={{ color: '#DF3415', fontSize: '1.2rem' }} />
          </button>
        </div>
      </React.Fragment>
    );
  };

  return (
        <div>
            <div className='flex items-center justify-center mt-5 mb-5'>
              <h1 className='bold text-2xl'>Lista de fichas tecnicas</h1>
            </div>
          <div className='border border-gray-300 mx-10'>
              <DataTable value={listSheets} showGridlines stripedRows tableStyle={{minWidth: '50rem'}}
              dataKey="id" filters={filters} filterDisplay="row" 
                    globalFilterFields={['name', 'brand.name', 'serial', 'status']}  emptyMessage="No existe el equipo.">
                  <Column field="typeTheEquipment" header="Tipo de equipo" filter filterPlaceholder="Buscar por tipo de equipo"></Column>
                  <Column field="brand" header="Marca" filter filterField="brand" filterPlaceholder='Buscar por marca' ></Column>
                  <Column field="serial" header="Serial" filter filterField='serial' filterPlaceholder='Buscar por serial'></Column>
                  <Column field="updatedAt" header="Fecha de creacion" body={(rowData) => rowData.updatedAt.toLocaleDateString()}></Column>
                  <Column body={actionBodyTemplate} header="Acciones"></Column>
             </DataTable>
          </div>
            <Dialog header="Ficha tenica" visible={showModalSheet} style={{ width: '80vw' }} onHide={() => {setShowModalSheet(false); console.log('que pasa aqui') }}>
                {
                  selectShowModalSheet && (
                    <div className='flex flex-col'>
                      <div className='flex items-center justify-center gap-7' >
                            {selectShowModalSheet.typeTheEquipment && (
                                <div className='flex m-2 justify-center items-center gap-2 border border-gray-400 px-3 py-2' >
                                  <h1 className='font-sans font-semibold'>Tipo de equipo: </h1>
                                  <p className='font-sans'>{selectShowModalSheet.typeTheEquipment}</p>
                                </div>
                            )}
                            {selectShowModalSheet.brand && (
                                <div className='flex m-2 justify-center items-center gap-2 border border-gray-400 px-3 py-2' >
                                  <h1 className='font-sans font-semibold'>Marca: </h1>
                                  <p className='font-sans'>{selectShowModalSheet.brand}</p>
                                </div>
                            )}
                            {selectShowModalSheet.capacity && (
                                <div className='flex m-2 justify-center items-center gap-2 border border-gray-400 px-3 py-2' >
                                  <h1 className='font-sans font-semibold'>Capacidad: </h1>
                                  <p className='font-sans'>{selectShowModalSheet.capacity}</p>
                                </div>
                            )}
                            {selectShowModalSheet.serial && (
                                <div className='flex m-2 justify-center items-center gap-2 border border-gray-400 px-3 py-2' >
                                  <h1 className='font-sans font-semibold'>Serial: </h1>
                                  <p className='font-sans'>{selectShowModalSheet.serial}</p>
                                </div>
                            )}
                      </div>
                      <div className='flex items-center justify-center'>
                            {selectShowModalSheet.location && (
                                <div className='flex flex-col w-7/12  m-2 justify-center items-center border border-gray-400 px-3 py-2' >
                                  <h1 className='font-sans font-semibold'>Ubicacion del equipo: </h1>
                                  <p className='font-sans'>{selectShowModalSheet.location}</p>
                                </div>
                            )}
                      </div>
                      <div className='flex flex-col mt-1'>
                        {/* <div className='flex items-center justify-center'>
                          <h1 className='font-sans font-semibold'>Condiciones del equipo</h1>
                        </div> */}
                        <div className='flex items-center justify-center'>
                            <div className='flex flex-col'>
                              {selectShowModalSheet.ifm && (
                                <div className='flex m-2 justify-center items-center border border-gray-400 px-2 py-2' >
                                  <h1 className='font-sans font-semibold'>IFM: </h1>
                                  <p className='font-sans pl-2'>{selectShowModalSheet.ifm}</p>
                                </div>
                              )}
                              {selectShowModalSheet.ofm && (
                                <div className='flex m-2 justify-center items-center border border-gray-400 px-2 py-2' >
                                  <h1 className='font-sans font-semibold'>OFM: </h1>
                                  <p className='font-sans pl-2'>{selectShowModalSheet.ofm}</p>
                                </div>
                              )}
                              {selectShowModalSheet.evaporatorOutletTemp && (
                                <div className='flex m-2 justify-center items-center border border-gray-400 px-2 py-2' >
                                  <h1 className='font-sans font-semibold'>Temperatura de salida del evaporador: </h1>
                                  <p className='font-sans pl-2'>{selectShowModalSheet.evaporatorOutletTemp}</p>
                                </div>
                              )}
                              {selectShowModalSheet.capacitorOutletTemp && (
                                <div className='flex m-2 justify-center items-center border border-gray-400 px-2 py-2' >
                                  <h1 className='font-sans font-semibold'>Temperatura de salida del capacitor: </h1>
                                  <p className='font-sans pl-2'>{selectShowModalSheet.capacitorOutletTemp}</p>
                                </div>
                              )}
                              {selectShowModalSheet.compressorComsumption && (
                                <div className='flex m-2 justify-center items-center border border-gray-400 px-2 py-2' >
                                  <h1 className='font-sans font-semibold'>Consumo del compresor: </h1>
                                  <p className='font-sans pl-2'>{selectShowModalSheet.compressorComsumption}</p>
                                </div>
                              )}
                              {selectShowModalSheet.equipmentComsumption && (
                                <div className='flex m-2 justify-center items-center border border-gray-400 px-2 py-2' >
                                  <h1 className='font-sans font-semibold'>Consumo del equipo: </h1>
                                  <p className='font-sans pl-2'>{selectShowModalSheet.equipmentComsumption}</p>
                                </div>
                              )}
                            </div>
                            <div className='flex flex-col'>
                              {selectShowModalSheet.returnPressure && (
                                <div className='flex m-2 justify-center items-center border border-gray-400 px-2 py-2' >
                                  <h1 className='font-sans font-semibold'>Presion de retorno: </h1>
                                  <p className='font-sans pl-2'>{selectShowModalSheet.returnPressure}</p>
                                </div>
                              )}
                              {selectShowModalSheet.dischargePresure && (
                                <div className='flex m-2 justify-center items-center border border-gray-400 px-2 py-2' >
                                  <h1 className='font-sans font-semibold'>Presion de descarga: </h1>
                                  <p className='font-sans pl-2'>{selectShowModalSheet.dischargePresure}</p>
                                </div>
                              )}
                              {selectShowModalSheet.refrigerantType && (
                                <div className='flex m-2 justify-center items-center border border-gray-400 px-2 py-2' >
                                  <h1 className='font-sans font-semibold'>Tipo de refrigerante: </h1>
                                  <p className='font-sans pl-2'>{selectShowModalSheet.refrigerantType}</p>
                                </div>
                              )}
                              {selectShowModalSheet.evaporatorStatus && (
                                <div className='flex m-2 justify-center items-center border border-gray-400 px-2 py-2' >
                                  <h1 className='font-sans font-semibold'>Estado del evaporador: </h1>
                                  <p className='font-sans pl-2'>{selectShowModalSheet.evaporatorStatus}</p>
                                </div>
                              )}
                              {selectShowModalSheet.capacitorStatus && (
                                <div className='flex m-2 justify-center items-center border border-gray-400 px-2 py-2' >
                                  <h1 className='font-sans font-semibold'>Estado del capacitor: </h1>
                                  <p className='font-sans pl-2'>{selectShowModalSheet.capacitorStatus}</p>
                                </div>
                              )}
                              {selectShowModalSheet.mttoPre && (
                                <div className='flex m-2 justify-center items-center border border-gray-400 px-2 py-2' >
                                  <h1 className='font-sans font-semibold'>MTTO PRE: </h1>
                                  <p className='font-sans pl-2'>{selectShowModalSheet.mttoPre}</p>
                                </div>
                              )}
                            </div>
                        </div>
                      </div>
                      <div className='flex items-center justify-center w-full'>
                            {selectShowModalSheet.technicalReport && (
                                <div className='flex flex-col w-full  m-2 justify-center items-center border border-gray-400 px-3 py-2' >
                                  <h1 className='font-sans font-semibold'>Reporte Tecnico: </h1>
                                  <p className='font-sans'>{selectShowModalSheet.technicalReport}</p>
                                </div>
                            )}
                      </div>
                      <div className='flex items-center justify-center w-full mb-5'>
                            {selectShowModalSheet.recommendations && (
                                <div className='flex flex-col w-full  m-2 justify-center items-center border border-gray-400 px-3 py-2' >
                                  <h1 className='font-sans font-semibold'>Recomendaciones: </h1>
                                  <p className='font-sans'>{selectShowModalSheet.recommendations}</p>
                                </div>
                            )}
                      </div>
                      <div>
                        {
                          selectShowModalSheet.images && (
                            <div className='flex items-center justify-center gap-5'>
                              {selectShowModalSheet.images.map((image) => (
                                <Image key={image.id} src={image.url} alt='imagen' width={450} height={350} onClick={() => setSelectedImage(image.url)} />
                              ))}
                            </div>
                          )
                        }
                        {selectedImage && (
                        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center' onClick={() => setSelectedImage(null)}>
                          <Image src={selectedImage} alt='Imagen ampliada' layout='fill' objectFit='contain' />
                        </div>
                      )}
                      </div>
                    </div>
                  )
                }
            </Dialog>
        </div>
  );
};

export default TechnicalSheet;