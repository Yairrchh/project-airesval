"use client";
import React, {useState, useRef, useEffect} from 'react';
import { Messages } from 'primereact/messages';
import { Skeleton } from 'primereact/skeleton';        
import prisma from "@/lib/db";
import { addNewSheet } from 'app/actions/actions';
import 'primereact/resources/themes/md-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'; // core css
import 'primeicons/primeicons.css'; // iconos

 


export default function NewTechnicalSheet() {

  //states for the basic information of the technical sheet
  const [typeTheEquipment, setTypeTheEquipment] = useState('');
  const [brand, setBrand] = useState('');
  const [capacity, setCapacity] = useState('');
  const [serial, setSerial] = useState('');
  const [location, setLocation] = useState('');
  const [ifm, setIfm] = useState('');
  const [ofm, setOfm] = useState('');
  const [evaporatorOutletTemp, setEvaporatorOutletTemp] = useState('');
  const [capacitorOutletTemp, setCapacitorOutletTemp] = useState('');
  const [compressorComsumption, setCompressorComsumption] = useState('');
  const [equipmentComsumption, setEquipmentComsumption] = useState('');
  const [returnPressure, setReturnPressure] = useState('');
  const [dischargePresure, setDischargePresure] = useState('');
  const [refrigerantType, setRefrigerantType] = useState('');
  const [evaporatorStatus, setEvaporatorStatus] = useState('');
  const [capacitorStatus, setCapacitorStatus] = useState('');
  const [mttoPre, setMttoPre] = useState('');
  const [technicalReport, setTechnicalReport] = useState('');
  const [recommendations, setRecommendations] = useState('');
  //state for the send images to the cloudinary
  const [imageUpload, setImageUpload] = useState<File[]>([]);
  //state for the images url
  const [imageURL, setImageURL] = useState<string[]>([]);
  //reference for the file input reset

  //modal state confimation all okey
  const [showModal, setShowModal] = useState(true);
  //reference for the messages
  const fileInputRef = useRef<HTMLInputElement>(null);
  //reference for the messages
  const messages = useRef<Messages>(null);
  //loading the skeleton
  const [isLoading, setIsLoading] = useState(true);
  //Funcion para manejar el envio de la informacion
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Verificar si no hay imágenes
    if (imageUpload.length === 0) {
    messages.current?.show({severity: 'error', summary: 'Error al guardar', detail: 'Carga al menos 1 imagen.'});

    return; // Detener la ejecución si no hay imágenes
  }

    let imageUrls = []; // Almacenará las URLs de las imágenes cargadas, si las hay

  // Verificar si hay imágenes para cargar
  if (imageUpload.length > 0) {
    const imageFormData = new FormData();
    imageUpload.forEach((file) => {
      imageFormData.append('imageUpload', file);
    });

    try {
      const imageResponse = await fetch('/api/upload', {
        method: 'POST',
        body: imageFormData,
      });
      const imageData = await imageResponse.json();
      console.log(imageData.urls, 'url de la imagen');
      imageUrls = imageData.urls; // Almacenar las URLs de las imágenes cargadas
    } catch (error) {
      console.error("Error al cargar las imágenes:", error);
      // Manejar el error de carga de imágenes aquí...
    }
  }
  
      const formData = new FormData();
        formData.append("typeTheEquipment", typeTheEquipment);
        formData.append("brand", brand);
        formData.append("capacity", capacity);
        formData.append("serial", serial);
        formData.append("location", location);
        formData.append("ifm", ifm);
        formData.append("ofm", ofm);
        formData.append("evaporatorOutletTemp", evaporatorOutletTemp);
        formData.append("capacitorOutletTemp", capacitorOutletTemp);
        formData.append("compressorComsumption", compressorComsumption);
        formData.append("equipmentComsumption", equipmentComsumption);
        formData.append("returnPressure", returnPressure);
        formData.append("dischargePresure", dischargePresure);
        formData.append("refrigerantType", refrigerantType);
        formData.append("evaporatorStatus", evaporatorStatus);
        formData.append("capacitorStatus", capacitorStatus);
        formData.append("mttoPre", mttoPre);
        formData.append("technicalReport", technicalReport);
        formData.append("recommendations", recommendations);

        imageUrls.forEach((url: string) => {
          formData.append('images', url);
        });

        try {
          await addNewSheet(formData);
          messages.current?.show({severity: 'success', summary: 'Guardado exitoso', detail: 'La hoja técnica se guardó correctamente.'});
          // Resetear los campos del formulario
          setTypeTheEquipment('');
          setBrand('');
          setCapacity('');
          setSerial('');
          setLocation('');
          setIfm('');
          setOfm('');
          setEvaporatorOutletTemp('');
          setCapacitorOutletTemp('');
          setCompressorComsumption('');
          setEquipmentComsumption('');
          setReturnPressure('');
          setDischargePresure('');
          setRefrigerantType('');
          setEvaporatorStatus('');
          setCapacitorStatus('');
          setMttoPre('');
          setTechnicalReport('');
          setRecommendations('');
          setImageUpload([]);
          setImageURL([]);

            // Resetear el input de archivos
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } catch (error) {
          messages.current?.show({severity: 'error', summary: 'Error al guardar', detail: 'No se pudo guardar la hoja técnica.'});

          console.error("Error al crear la ficha técnica:", error);
        }
  
  };
  //El uso de use effect para enviar la informacion por que imageURL es asincrono hay que esperar
  //que este disponible para enviarlo a la base de datos.
  //  useEffect(() => {
  //   if (imageURL.length > 0) {
  //     const submitForm = async () => {
  //       const formData = new FormData();
  //       formData.append("typeTheEquipment", typeTheEquipment);
  //       formData.append("brand", brand);
  //       formData.append("capacity", capacity);
  //       formData.append("serial", serial);
  //       formData.append("location", location);
  //       formData.append("ifm", ifm);
  //       formData.append("ofm", ofm);
  //       formData.append("evaporatorOutletTemp", evaporatorOutletTemp);
  //       formData.append("capacitorOutletTemp", capacitorOutletTemp);
  //       formData.append("compressorComsumption", compressorComsumption);
  //       formData.append("equipmentComsumption", equipmentComsumption);
  //       formData.append("returnPressure", returnPressure);
  //       formData.append("dischargePresure", dischargePresure);
  //       formData.append("refrigerantType", refrigerantType);
  //       formData.append("evaporatorStatus", evaporatorStatus);
  //       formData.append("capacitorStatus", capacitorStatus);
  //       formData.append("mttoPre", mttoPre);
  //       formData.append("technicalReport", technicalReport);
  //       formData.append("recommendations", recommendations);

  //       imageURL.forEach((url) => {
  //         formData.append('images', url);
  //       });

  //       try {
  //         await addNewSheet(formData);
  //           // setShowModal(true); // Muestra el modal
  //           // setTimeout(() => {
  //           //   setShowModal(false); // Oculta el modal después de 3 segundos
  //           // }, 3000);
  //         messages.current?.show({severity: 'success', summary: 'Guardado exitoso', detail: 'La hoja técnica se guardó correctamente.'});
  //         console.log("Ficha técnica creada con éxito.");

  //         // Resetear los campos del formulario
  //         setTypeTheEquipment('');
  //         setBrand('');
  //         setCapacity('');
  //         setSerial('');
  //         setLocation('');
  //         setIfm('');
  //         setOfm('');
  //         setEvaporatorOutletTemp('');
  //         setCapacitorOutletTemp('');
  //         setCompressorComsumption('');
  //         setEquipmentComsumption('');
  //         setReturnPressure('');
  //         setDischargePresure('');
  //         setRefrigerantType('');
  //         setEvaporatorStatus('');
  //         setCapacitorStatus('');
  //         setMttoPre('');
  //         setTechnicalReport('');
  //         setRecommendations('');
  //         setImageUpload([]);
  //         setImageURL([]);

  //           // Resetear el input de archivos
  //         if (fileInputRef.current) {
  //           fileInputRef.current.value = "";
  //         }
  //       } catch (error) {
  //         messages.current?.show({severity: 'error', summary: 'Error al guardar', detail: 'No se pudo guardar la hoja técnica.'});

  //         console.error("Error al crear la ficha técnica:", error);
  //       }
  //     };

  //     submitForm();
  //   } else {
  //     console.log("No hay imágenes para subir.");
  //   }
  // }, [imageURL]);

  //Funcion para manejar el cambio de la imagen
  const handleImageChange = (event: React.FormEvent<HTMLInputElement>) => {
    // Acceder a los archivos seleccionados
        if (event.currentTarget.files && event.currentTarget.files.length > 0) {
          setImageUpload(Array.from(event.currentTarget.files));
      console.log(event.currentTarget.files);
    } else {
      console.log("No se seleccionó ningún archivo.");
    }
  };

    useEffect(() => {
    // Simula la carga de datos con un temporizador
    const loadData = async () => {
      // Aquí iría tu lógica de carga de datos
      // Por ejemplo, cargar datos de una API
      setTimeout(() => {
        setIsLoading(false); // Cambia isLoading a false una vez que los datos estén cargados
      }, 2000); // Simula un retraso de 2 segundos
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center mt-20 mx-10">
        <Skeleton className="mb-2"></Skeleton>
        <Skeleton width="20rem" className="mb-2"></Skeleton>
        <Skeleton width="15rem" className="mb-2"></Skeleton>
        <Skeleton height="10rem" className="mb-2"></Skeleton>
        <Skeleton width="20rem" height="4rem"></Skeleton>
      </div>
    );
  }
  return (
    <div>
        <div className='flex items-center justify-center mt-5 mb-5'>
            <h1 className='bold text-2xl'>Agregar nueva ficha tecnica</h1>
        </div>
        <div className='border border-gray-300 mx-10' >
          <form onSubmit={handleSubmit} className='flex flex-col items-center w-full justify-center'>
            <div className='flex items-center justify-center gap-7 '>
              <div className='flex flex-col m-2'>
                <label className='font-sans my-2' >Tipo de equipo <span className='text-red-500'>*</span> </label>
                <input value={typeTheEquipment} onChange={(event) => setTypeTheEquipment(event.target.value)} className='w-48 outline-none border rounded
                 bg-slate-200 border-opacity-30 text-gray-700 border-gray-600 px-2' required type='text' id="typeTheEquipment" name="typeTheEquipment"/>
              </div>
              <div className='flex flex-col m-2' >
                <label className='font-sans my-2' >Marca <span className='text-red-500'>*</span>  </label>
                <input value={brand} onChange={(event => setBrand(event.target.value))} className='w-48 outline-none border rounded bg-slate-200
                 border-opacity-30 text-gray-700 border-gray-600 px-2' required type='text' id="brand" name='brand' />
              </div>
              <div className='flex flex-col m-2'>
                <label className='font-sans my-2' >Capacidad <span className='text-red-500'>*</span> </label>
                <input value={capacity} onChange={(event) => setCapacity(event.target.value)} className='w-48 outline-none border rounded bg-slate-200 
                border-opacity-30 text-gray-700 border-gray-600 px-2' required type='text' id="capacity" name='capacity' />
              </div>
              <div className='flex flex-col m-2'>
                <label className='font-sans my-2' >Serial <span className='text-red-500'>*</span> </label>
                <input value={serial} onChange={(event) => setSerial(event.target.value)}  className='w-48 outline-none border rounded bg-slate-200
                border-opacity-30 text-gray-700 border-gray-600 px-2' required type='text' id="serial" name='serial' />
              </div>
            </div>
            <div className='flex flex-col m-2 w-7/12 '>
              <label className='font-sans my-2' >Ubicacion<span className='text-red-500'>*</span> </label>
              <input value={location} onChange={(event) => setLocation(event.target.value)} className='w-full outline-none border rounded bg-slate-200
              border-opacity-30 text-gray-700 border-gray-600 px-2' required type='text' id="location" name='location' />
            </div>
            <div className='w-full'>
                <div className='flex items-center justify-center pt-3 mt-5 mb-5 border-t w-full border-gray-300' >
                    <h1 className='bold text-xl' >Condiciones del equipo</h1>
                </div> 
                <div className='flex items-center justify-center gap-20'>
                    <div className='flex flex-col items-end justify-end gap-y-4'>
                        <div className='flex items-center justify-center gap-2'>
                          <label>Ventilador IFM</label>
                          <input value={ifm} onChange={(event) => setIfm(event.target.value)} className='w-48 outline-none border rounded bg-slate-200
                          border-opacity-30 text-gray-700 border-gray-600 px-2' type='text' id='ifm' name='ifm' />
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                          <label>Ventilador OFM</label>
                          <input value={ofm} onChange={(event) => setOfm(event.target.value)} className='w-48 outline-none border rounded bg-slate-200
                          border-opacity-30 text-gray-700 border-gray-600 px-2' type='text' id='ofm' name='ofm' />
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                          <label>°C de salida del evaporador</label>
                          <input value={evaporatorOutletTemp} onChange={(event) => setEvaporatorOutletTemp(event.target.value)} className='w-48 outline-none border rounded
                          bg-slate-200 border-opacity-30 text-gray-700 border-gray-600 px-2' type='text' id='evaporatorOutletTemp' name='evaporatorOutletTemp' />
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                          <label>°C de salida del condensador</label>
                          <input value={capacitorOutletTemp} onChange={(event) => setCapacitorOutletTemp(event.target.value)} className='w-48 outline-none border
                          rounded bg-slate-200 border-opacity-30 text-gray-700 border-gray-600 px-2' type='text' id='capacitorOutletTemp' name='capacitorOutletTemp' />
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                          <label>Consumo del compresor</label>
                          <input value={compressorComsumption} onChange={(event) => setCompressorComsumption(event.target.value)} className='w-48 outline-none border rounded
                           bg-slate-200 border-opacity-30 text-gray-700 border-gray-600 px-2' type='text' id='compressorComsumption' name='compressorComsumption' />
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                          <label>Consumo del equipo</label>
                          <input value={equipmentComsumption} onChange={(event) => setEquipmentComsumption(event.target.value)} className='w-48 outline-none 
                          border rounded bg-slate-200 border-opacity-30 text-gray-700 border-gray-600 px-2' type='text' id='equipmentComsumption' name='equipmentComsumption' />
                        </div>
                    </div>
                    <div className='flex flex-col items-end justify-end gap-y-4'>
                        <div className='flex items-center justify-center gap-2'>
                          <label>Presion de retorno</label>
                          <input value={returnPressure} onChange={(event) => setReturnPressure(event.target.value)} className='w-48 outline-none border 
                          rounded bg-slate-200 border-opacity-30 text-gray-700 border-gray-600 px-2' type='text' id='returnPressure' name='returnPressure' />
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                          <label>Presion de descarga</label>
                          <input value={dischargePresure} onChange={(event) => setDischargePresure(event.target.value)} className='w-48 outline-none border 
                          rounded bg-slate-200 border-opacity-30 text-gray-700 border-gray-600 px-2' type='text' id='dischargePresure' name='dischargePresure' />
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                          <label>Tipo de refrigerante</label>
                          <input value={refrigerantType} onChange={(event) => setRefrigerantType(event.target.value)} className='w-48 outline-none border 
                          rounded bg-slate-200 border-opacity-30 text-gray-700 border-gray-600 px-2' type='text' id='refrigerantType' name='refrigerantType' />
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                          <label>Evaporator status</label>
                          <input value={evaporatorStatus} onChange={(event) => setEvaporatorStatus(event.target.value)} className='w-48 outline-none border 
                          rounded bg-slate-200 border-opacity-30 text-gray-700 border-gray-600 px-2' type='text' id='evaporatorStatus' name='evaporatorStatus' />
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                          <label>Estado del condensador</label>
                          <input value={capacitorStatus} onChange={(event) => setCapacitorStatus(event.target.value)} className='w-48 outline-none border 
                          rounded bg-slate-200 border-opacity-30 text-gray-700 border-gray-600 px-2' type='text' id='capacitorStatus' name='capacitorStatus' />
                        </div>
                        <div className='flex items-center justify-center gap-2'>
                          <label>MTTO PRE</label>
                          <input value={mttoPre} onChange={(event) => setMttoPre(event.target.value)} className='w-48 outline-none border 
                          rounded bg-slate-200 border-opacity-30 text-gray-700 border-gray-600 px-2' type='text' id='mttopre' name='mttopre' />
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <div className='flex flex-col items-center justify-center pt-3 mt-5 mb-5 border-t w-full border-gray-300'>
                      <label className='bold text-xl mb-2' >Informe Tecnico</label>
                      <textarea value={technicalReport} onChange={(event) => setTechnicalReport(event.target.value)} className='w-1/2 outline-none border 
                      rounded bg-slate-200 border-opacity-30 text-gray-700 border-gray-600 px-2' rows={3} id='technicalReport' name='technicalReport' />
                    </div>
                </div>
                <div className='w-full'>
                    <div className='flex flex-col items-center justify-center pt-3 mt-5 mb-5 border-t w-full border-gray-300'>
                      <label className='bold text-xl mb-2'>Recomendaciones</label>
                      <textarea value={recommendations} onChange={(event) => setRecommendations(event.target.value)} className='w-1/2 outline-none border 
                      rounded bg-slate-200 border-opacity-30 text-gray-700 border-gray-600 px-2' rows={3} id='recommendations' name='recommendations' />
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center gap-2'>
                  <label  className='font-sans my-2'>Subir imagenenes<span className='text-red-500'>*</span></label>
                  <input ref={fileInputRef} onChange={handleImageChange} className='p-4 outline-none border rounded 
                  bg-slate-200 border-opacity-30 text-gray-700 border-gray-600 px-2' type='file' id="images" name='images' accept='image/png, image/jpeg' multiple />
                </div>
            </div>
            <div className='flex items-center justify-center gap-20 mt-5 mb-5'>
              <button className='bg-red-400/70 text-black px-5 py-2 rounded transition-transform transform-gpu hover:scale-110 ease-out duration-300' type='reset'>Cancelar</button>
              <button className='bg-blue-400/70 text-black px-5 py-2 rounded transition-transform transform-gpu hover:scale-110 ease-out duration-300' type='submit'>Guardar</button>
            </div>
          </form>
        </div>
            
        {showModal && (
            <div className="fixed top-1 right-1 z-50">
              <Messages ref={messages} />
            </div>
        )}
    </div>
  );
};
