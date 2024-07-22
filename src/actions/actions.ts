"use server";

import prisma from "app/lib/db";
import { get } from "http";

export async function addTask(formData: FormData) {
  await prisma.task.create({
    data: {
        name: formData.get("name") as string,
    },
  });
}
//Add new sheet
export async function addNewSheet(formData: FormData) {

  const imagesUrls = formData.getAll("images") as string[];
  console.log(imagesUrls, 'informacion almacenada en imagesUrls')

  const newSheet = await prisma.newSheet.create({
    data: {
      typeTheEquipment: formData.get("typeTheEquipment") as string,
      brand: formData.get("brand") as string,
      capacity: formData.get("capacity") as string,
      serial: formData.get("serial") as string,
      location: formData.get("location") as string,
      ifm: formData.get("ifm") as string,
      ofm: formData.get("ofm") as string,
      evaporatorOutletTemp: formData.get("evaporatorOutletTemp") as string,
      capacitorOutletTemp: formData.get("capacitorOutletTemp") as string,
      compressorComsumption: formData.get("compressorComsumption") as string,
      equipmentComsumption: formData.get("equipmentComsumption") as string,
      returnPressure: formData.get("returnPressure") as string,
      dischargePresure: formData.get("dischargePresure") as string,
      refrigerantType: formData.get("refrigerantType") as string,
      evaporatorStatus: formData.get("evaporatorStatus") as string,
      capacitorStatus: formData.get("capacitorStatus") as string,
      mttoPre: formData.get("mttoPre") as string,
      technicalReport: formData.get("technicalReport") as string,
      recommendations: formData.get("recommendations") as string,
    },
  });

    if (imagesUrls.length > 0) {
    await Promise.all(imagesUrls.map(url => 
      prisma.image.create({
        data: {
          newSheetId: newSheet.id, // Asegúrate de que 'newSheet.id' es accesible y correcto
          url: url,
        },
      })
    ));
  }

}
//Get all sheets
export async function getNewSheets() {
  const listSheets = await prisma.newSheet.findMany(
    {
      include: {
        images: true,
      },
    }
  );
  return listSheets;
}
//Delete sheet
export async function deleteSheet(sheetId: number) {
  try {
    await prisma.image.deleteMany({
      where: {
        newSheetId: sheetId,
      },
    });


    const deleteSheet = await prisma.newSheet.delete({
      where: {
        id: sheetId,
      },
    });
    console.log('Product eliminado', deleteSheet);
    return deleteSheet;
  } catch (error) {
    console.error('Error al eliminar la hoja técnica', error);
  }
}
  //traer sheet por id 
 export async function getSheetById(sheetId: number) {
  try {
    const sheet = await prisma.newSheet.findUnique({
      where: {
        id: sheetId,
      },
    });
    if (sheet) {
      console.log('Ficha técnica encontrada:', sheet);
      return sheet;
    } else {
      console.log('No se encontró la ficha técnica con el ID:', sheetId);
      return null; // O manejar según sea necesario
    }
  } catch (error) {
    console.error('Error al obtener la ficha técnica', error);
    throw error; // O manejar según sea necesario
  }
}
//edit sheet 
export async function editSheet(sheetId: number, formData: FormData) {

  const imagesUrls = formData.getAll("images") as string[];
  console.log(imagesUrls, 'informacion almacenada en imagesUrls')

  try {
    // Actualizar la hoja específica
    const updatedSheet = await prisma.newSheet.update({
      where: {
        id: sheetId,
      },
      data: {
        typeTheEquipment: formData.get("typeTheEquipment") as string,
        brand: formData.get("brand") as string,
        capacity: formData.get("capacity") as string,
        serial: formData.get("serial") as string,
        location: formData.get("location") as string,
        ifm: formData.get("ifm") as string,
        ofm: formData.get("ofm") as string,
        evaporatorOutletTemp: formData.get("evaporatorOutletTemp") as string,
        capacitorOutletTemp: formData.get("capacitorOutletTemp") as string,
        compressorComsumption: formData.get("compressorComsumption") as string,
        equipmentComsumption: formData.get("equipmentComsumption") as string,
        returnPressure: formData.get("returnPressure") as string,
        dischargePresure: formData.get("dischargePresure") as string,
        refrigerantType: formData.get("refrigerantType") as string,
        evaporatorStatus: formData.get("evaporatorStatus") as string,
        capacitorStatus: formData.get("capacitorStatus") as string,
        mttoPre: formData.get("mttoPre") as string,
        technicalReport: formData.get("technicalReport") as string,
        recommendations: formData.get("recommendations") as string,
        // Añade o actualiza campos según sea necesario
      },
    });

    if(imagesUrls && imagesUrls.length > 0) {
      await prisma.image.deleteMany({
      where: {
        newSheetId: sheetId,
      },
    });

    // Paso 3: Agregar las nuevas imágenes
    if (imagesUrls.length > 0) {
      await Promise.all(imagesUrls.map(url =>
        prisma.image.create({
          data: {
            newSheetId: sheetId, // Asegúrate de que este ID es correcto y accesible
            url: url,
          },
        })
      ));
    }
    }


    console.log('Hoja técnica actualizada:', updatedSheet);
    return updatedSheet;
  } catch (error) {
    console.error('Error al actualizar la hoja técnica', error);
    throw error; // O manejar según sea necesario
  }
}

