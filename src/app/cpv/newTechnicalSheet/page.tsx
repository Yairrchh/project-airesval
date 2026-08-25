"use client";
import React, {useState, useRef} from 'react';
import { Messages } from 'primereact/messages';
import { addNewSheet } from 'app/actions/actions';
import Gauge from "../../components/Gauge";

 


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

  return (
    <div className='bg-paper min-h-[calc(100vh-15rem)] px-4 sm:px-6 py-8'>
        <div className='flex flex-col items-center justify-center mb-6 gap-1'>
            <div className='flex items-center gap-2 text-steel-400'>
              <Gauge className='w-4 h-4' needleDeg={20} />
              <span className='field-label !mb-0'>Nueva inspección</span>
            </div>
            <h1 className='font-display font-semibold text-2xl text-steel-700'>Agregar ficha técnica</h1>
        </div>
        <div className='card-panel mx-auto max-w-4xl px-6 sm:px-10 py-8' >
          <form onSubmit={handleSubmit} className='flex flex-col w-full'>

            <p className='section-title mb-4'><span className='text-brass font-mono text-sm'>01</span> Datos del equipo</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
              <div className='flex flex-col'>
                <label className='field-label'>Tipo de equipo <span className='text-alert'>*</span></label>
                <input value={typeTheEquipment} onChange={(event) => setTypeTheEquipment(event.target.value)} className='field-input' required type='text' id="typeTheEquipment" name="typeTheEquipment"/>
              </div>
              <div className='flex flex-col'>
                <label className='field-label'>Marca <span className='text-alert'>*</span></label>
                <input value={brand} onChange={(event => setBrand(event.target.value))} className='field-input' required type='text' id="brand" name='brand' />
              </div>
              <div className='flex flex-col'>
                <label className='field-label'>Capacidad <span className='text-alert'>*</span></label>
                <input value={capacity} onChange={(event) => setCapacity(event.target.value)} className='field-input' required type='text' id="capacity" name='capacity' />
              </div>
              <div className='flex flex-col'>
                <label className='field-label'>Serial <span className='text-alert'>*</span></label>
                <input value={serial} onChange={(event) => setSerial(event.target.value)} className='field-input' required type='text' id="serial" name='serial' />
              </div>
            </div>
            <div className='flex flex-col mt-4'>
              <label className='field-label'>Ubicación <span className='text-alert'>*</span></label>
              <input value={location} onChange={(event) => setLocation(event.target.value)} className='field-input' required type='text' id="location" name='location' />
            </div>

            <div className='border-t border-line mt-8 pt-6'>
                <p className='section-title mb-4'><span className='text-brass font-mono text-sm'>02</span> Condiciones del equipo</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4'>
                    <div className='flex flex-col'>
                      <label className='field-label'>Ventilador IFM</label>
                      <input value={ifm} onChange={(event) => setIfm(event.target.value)} className='field-input' type='text' id='ifm' name='ifm' />
                    </div>
                    <div className='flex flex-col'>
                      <label className='field-label'>Presión de retorno</label>
                      <input value={returnPressure} onChange={(event) => setReturnPressure(event.target.value)} className='field-input' type='text' id='returnPressure' name='returnPressure' />
                    </div>
                    <div className='flex flex-col'>
                      <label className='field-label'>Ventilador OFM</label>
                      <input value={ofm} onChange={(event) => setOfm(event.target.value)} className='field-input' type='text' id='ofm' name='ofm' />
                    </div>
                    <div className='flex flex-col'>
                      <label className='field-label'>Presión de descarga</label>
                      <input value={dischargePresure} onChange={(event) => setDischargePresure(event.target.value)} className='field-input' type='text' id='dischargePresure' name='dischargePresure' />
                    </div>
                    <div className='flex flex-col'>
                      <label className='field-label'>°C salida evaporador</label>
                      <input value={evaporatorOutletTemp} onChange={(event) => setEvaporatorOutletTemp(event.target.value)} className='field-input' type='text' id='evaporatorOutletTemp' name='evaporatorOutletTemp' />
                    </div>
                    <div className='flex flex-col'>
                      <label className='field-label'>Tipo de refrigerante</label>
                      <input value={refrigerantType} onChange={(event) => setRefrigerantType(event.target.value)} className='field-input' type='text' id='refrigerantType' name='refrigerantType' />
                    </div>
                    <div className='flex flex-col'>
                      <label className='field-label'>°C salida condensador</label>
                      <input value={capacitorOutletTemp} onChange={(event) => setCapacitorOutletTemp(event.target.value)} className='field-input' type='text' id='capacitorOutletTemp' name='capacitorOutletTemp' />
                    </div>
                    <div className='flex flex-col'>
                      <label className='field-label'>Estado del evaporador</label>
                      <input value={evaporatorStatus} onChange={(event) => setEvaporatorStatus(event.target.value)} className='field-input' type='text' id='evaporatorStatus' name='evaporatorStatus' />
                    </div>
                    <div className='flex flex-col'>
                      <label className='field-label'>Consumo del compresor</label>
                      <input value={compressorComsumption} onChange={(event) => setCompressorComsumption(event.target.value)} className='field-input' type='text' id='compressorComsumption' name='compressorComsumption' />
                    </div>
                    <div className='flex flex-col'>
                      <label className='field-label'>Estado del condensador</label>
                      <input value={capacitorStatus} onChange={(event) => setCapacitorStatus(event.target.value)} className='field-input' type='text' id='capacitorStatus' name='capacitorStatus' />
                    </div>
                    <div className='flex flex-col'>
                      <label className='field-label'>Consumo del equipo</label>
                      <input value={equipmentComsumption} onChange={(event) => setEquipmentComsumption(event.target.value)} className='field-input' type='text' id='equipmentComsumption' name='equipmentComsumption' />
                    </div>
                    <div className='flex flex-col'>
                      <label className='field-label'>MTTO PRE</label>
                      <input value={mttoPre} onChange={(event) => setMttoPre(event.target.value)} className='field-input' type='text' id='mttopre' name='mttopre' />
                    </div>
                </div>
            </div>

            <div className='border-t border-line mt-8 pt-6'>
              <p className='section-title mb-3'><span className='text-brass font-mono text-sm'>03</span> Informe técnico</p>
              <textarea value={technicalReport} onChange={(event) => setTechnicalReport(event.target.value)} className='field-textarea w-full' rows={3} id='technicalReport' name='technicalReport' />
            </div>

            <div className='border-t border-line mt-8 pt-6'>
              <p className='section-title mb-3'><span className='text-brass font-mono text-sm'>04</span> Recomendaciones</p>
              <textarea value={recommendations} onChange={(event) => setRecommendations(event.target.value)} className='field-textarea w-full' rows={3} id='recommendations' name='recommendations' />
            </div>

            <div className='border-t border-line mt-8 pt-6'>
              <p className='section-title mb-3'><span className='text-brass font-mono text-sm'>05</span> Evidencia fotográfica</p>
              <label className='field-label'>Subir imágenes <span className='text-alert'>*</span></label>
              <input ref={fileInputRef} onChange={handleImageChange} className='field-input font-sans file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-steel-700 file:text-white file:font-display file:text-xs file:cursor-pointer cursor-pointer'
              type='file' id="images" name='images' accept='image/png, image/jpeg' multiple />
            </div>

            <div className='flex items-center justify-center gap-6 mt-10'>
              <button className='btn-secondary' type='reset'>Cancelar</button>
              <button className='btn-primary' type='submit'>Guardar ficha</button>
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
