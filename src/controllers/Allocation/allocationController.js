import Allocation from "../../models/AllocationModel.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

// export const getallallocation = async (req, res, next) => {
//   try {
//     const { Role, UserName } = jwt.decode(req.headers.authorization.split(' ')[1]);
//     const filter = Role === 'SuperAdmin' ? {} : Role === 'TeamLeader' ? { selectedTeamLeader: UserName } : {};
//     const { first = 0, rows = 20, globalfilter } = req.query;
//     const skipCount = parseInt(first), limitCount = parseInt(rows);
//     if (globalfilter) {
//       const regex = { $regex: globalfilter, $options: 'i' };
//       const stringFields = Object.keys(Allocation.schema.paths).filter(field => Allocation.schema.paths[field].instance === 'String');
//       if (stringFields.length > 0) filter.$or = stringFields.map(field => ({ [field]: regex }));
//     }
//     const resdata = await Allocation.find(filter).skip(skipCount).limit(limitCount);
//     const totallength = await Allocation.countDocuments(filter);
//     res.send({ resdata, totallength });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// };

// export const getallallocation = async (req, res, next) => {
//   try {
//     const { Role, UserName } = jwt.decode(req.headers.authorization.split(' ')[1]);
//     const filter =Role === 'SuperAdmin' ? {}: Role === 'TeamLeader'? { selectedTeamLeader: UserName }: Role === 'Telecaller'? { selectedTelecaller: UserName }: {};
//     const { first = 0, rows = 0, globalfilter } = req.query;
//     const skipCount = parseInt(first), limitCount = parseInt(rows);
//     if (globalfilter) {
//       const regex = { $regex: globalfilter, $options: 'i' };
//       const stringFields = Object.keys(Allocation.schema.paths).filter(field => Allocation.schema.paths[field].instance === 'String');
//       if (stringFields.length > 0) filter.$or = stringFields.map(field => ({ [field]: regex }));
//     }
//     const resdata = await Allocation.find(filter).skip(skipCount).limit(limitCount);
//     const totallength = await Allocation.countDocuments(filter);
//     res.send({ resdata, totallength });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// };


export const getallallocation = async (req, res, next) => {
  try {
    const { Role, UserName } = jwt.decode(req.headers.authorization.split(' ')[1]);
    const filter = Role === 'SuperAdmin' ? {} : Role === 'TeamLeader' ? { selectedTeamLeader: UserName } : Role === 'Telecaller' ? { selectedTelecaller: UserName } : {};
    const { globalfilter } = req.query;
    let filterQuery = Allocation.find(filter);
    if (globalfilter) {
      const regex = { $regex: globalfilter, $options: 'i' };
      const stringFields = Object.keys(Allocation.schema.paths).filter(field => Allocation.schema.paths[field].instance === 'String');
      if (stringFields.length > 0) {
        filterQuery = filterQuery.or(stringFields.map(field => ({ [field]: regex })));
      }
    }
    const resdata = await filterQuery.exec();
    const totallength = resdata.length;
    res.send({ resdata, totallength });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};



// export const getallallocation = async (req, res, next) => {
//   try {
//     const resdata = await Allocation.find();
//     res.send({ resdata, totallength: resdata.length });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// };



export const savebulkallocation = async (req, res) => {
  try {
    const data = req.body; 
    console.log(req.body)
    const result = await Allocation.insertMany(data);
    res.status(201).json({ success: true, message: "Bulk allocation upload successful", data: result });
  } catch (error) {
    console.error("Error in bulk upload:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// export const allocateTeamLeader = async (req, res) => {
//   try {
//     const { data, selectedTeamLeader } = req.body;
//     console.log("Received data:", data);
//     console.log("Selected team leader:", selectedTeamLeader);
//     const updatedData = data.map(item => ({
//       ...item,
//       selectedTeamLeader
//     }));
//     const result = await Promise.all(updatedData.map(async (item) => {
//       const { _id } = item;
//       return Allocation.findByIdAndUpdate(_id, { selectedTeamLeader });
//     }));

//     return res.status(200).json({ success: true, message: "Team leader allocated successfully", data: result });
//   } catch (error) {
//     console.error("Error in allocating team leader:", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };


// export const getSelectedTeamLeaderAndTelecallerData = async (req, res, next) => {
//   try {
//     const { Role, UserName } = jwt.decode(req.headers.authorization.split(' ')[1]);
//     let filter = {};
//     if (Role === 'SuperAdmin') {
//       // filter.$or = [{ selectedTeamLeader: { $exists: true, $ne: null } }, { selectedTelecaller: { $exists: true, $ne: null } }];
//       filter.$or = [ { selectedTelecaller: { $exists: true, $ne: null } }];
//     } else if (Role === 'TeamLeader') {
//       filter.selectedTeamLeader = UserName;
//     } else if (Role === 'Telecaller') {
//       filter.selectedTelecaller = UserName;
//     } else {
//       return res.status(200).json({ resdata: [], totallength: 0 });
//     }
//     const resdata = await Allocation.find(filter);
//     const totallength = resdata.length;
//     res.send({ resdata, totallength });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// };


export const getSelectedTeamLeaderAndTelecallerData = async (req, res, next) => {
  try {
    const { Role, UserName } = jwt.decode(req.headers.authorization.split(' ')[1]);
    let filter = {};
    if (Role === 'SuperAdmin') {
      filter.$or = [ { selectedTelecaller: { $exists: true, $ne: null } }];
      // filter.$or = [{ selectedTeamLeader: { $exists: true, $ne: null } }, { selectedTelecaller: { $exists: true, $ne: null } }];
    } else if (Role === 'TeamLeader') {
      filter.selectedTeamLeader = UserName;
    } else if (Role === 'Telecaller') {
      filter.selectedTelecaller = UserName;
    } else {
      return res.status(200).json({ resdata: [], totallength: 0 });
    }
    const { first = 0, rows = 0 } = req.query;
    const resdata = await Allocation.find(filter).skip(parseInt(first)).limit(parseInt(rows));
    const totallength = await Allocation.countDocuments(filter);
    res.send({ resdata, totallength });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

// export const getProductivityStatus = async (req, res) => {
//   try {
//     const allocations = await Allocation.find(
//       { Productivity_Status: { $ne: "" } },
//       { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Allocations with non-empty Productivity_Status retrieved successfully",
//       data: allocations,
//     });
//   } catch (error) {
//     console.error("Error in retrieving allocations with non-empty Productivity_Status:", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };


export const getProductivityStatus = async (req, res) => {
  try {
    const allocations = await Allocation.find();
    const filteredData = allocations.filter(item => item.Productivity_Status && item.Productivity_Status.trim() !== "");
    const finalResponse = {success: true,message: "Filtered data retrieved successfully",data: filteredData};
    return res.status(200).json(finalResponse);
  } catch (error) {
    console.error("Error in retrieving allocations:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// export const getFollowupAndFutureFollowupData = async (req, res, next) => {
//   try {
//     const { Role, UserName } = jwt.decode(req.headers.authorization.split(' ')[1]);
//     let filter = {};

//     if (Role === 'SuperAdmin') {
//       filter = { $or: [{ Disposition: /^Followup/ }, { Disposition: /^Future Followup/ }] };
//     } else if (Role === 'TeamLeader') {
//       filter = {
//         $and: [
//           { $or: [{ Disposition: /^Followup/ }, { Disposition: /^Future Followup/ }] },
//           { selectedTeamLeader: UserName },
//         ],
//       };
//     } else if (Role === 'Telecaller') {
//       filter = {
//         $and: [
//           { $or: [{ Disposition: /^Followup/ }, { Disposition: /^Future Followup/ }] },
//           { selectedTelecaller: UserName },
//         ],
//       };
//     } else {
//       // For any other role, return an empty array
//       return res.status(200).json({ resdata: [], totallength: 0 });
//     }

//     const resdata = await Allocation.find(filter).lean();
//     const totallength = resdata.length;

//     res.send({ resdata, totallength });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// };

// export const getFollowupAndFutureFollowupData = async (req, res, next) => {
//   try {
//     const { Role, UserName } = jwt.decode(req.headers.authorization.split(' ')[1]);
//     const filter = Role === 'SuperAdmin'
//       ? { $or: [{ Disposition: /^Followup/ }, { Disposition: /^Future Followup/ }] }
//       : Role === 'TeamLeader'
//       ? { $and: [{ $or: [{ Disposition: /^Followup/ }, { Disposition: /^Future Followup/ }] }, { selectedTeamLeader: UserName }] }
//       : Role === 'Telecaller'
//       ? { $and: [{ $or: [{ Disposition: /^Followup/ }, { Disposition: /^Future Followup/ }] }, { selectedTelecaller: UserName }] }
//       : { resdata: [], totallength: 0 };

//     if (typeof filter === 'object' && filter.resdata) {
//       return res.status(200).json(filter);
//     }

//     const resdata = await Allocation.find(filter).lean();
//     const totallength = resdata.length;
//     res.send({ resdata, totallength });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: 'Internal Server Error' });
//   }
// };

export const getFollowupAndFutureFollowupData = async (req, res, next) => {
  try {
    const { Role, UserName } = jwt.decode(req.headers.authorization.split(' ')[1]);
    const { first = 0, rows = 20 } = req.query;
    const filter = Role === 'SuperAdmin'
      ? { $or: [{ Disposition: /^Not Int/ }, { Disposition: /^Call Back/ },{ Disposition: /^DNE/ }] }
      : Role === 'TeamLeader'
      ? { $and: [{ $or: [{ Disposition: /^Not Int/ }, { Disposition: /^Call Back/ },{ Disposition: /^DNE/ }] }, { selectedTeamLeader: UserName }] }
      : Role === 'Telecaller'
      ? { $and: [{ $or: [{ Disposition: /^Not Int/ }, { Disposition: /^Call Back/ },{ Disposition: /^DNE/ }] }, { selectedTelecaller: UserName }] }
      : { resdata: [], totallength: 0 };
    if (typeof filter === 'object' && filter.resdata) {
      return res.status(200).json(filter);
    }
    const totallength = await Allocation.countDocuments(filter);
    const resdata = await Allocation.find(filter).skip(parseInt(first)) .limit(parseInt(rows)) .lean();
    res.status(200).send({ resdata, totallength });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};


// export const allocateTeamLeader = async (req, res) => {
//   try {
//     const { data, selectedTeamLeader, selectedTelecaller } = req.body;
//     const result = await Promise.all(data.map(async (item) => {
//       const allocationUpdate = {selectedTeamLeader: item.selectedTeamLeader || selectedTeamLeader,selectedTelecaller: selectedTelecaller || undefined,};
//       const updatedAllocation = await Allocation.findByIdAndUpdate(item._id, allocationUpdate, { new: true });
//       return updatedAllocation;
//     }));
//     return res.status(200).json({ success: true, message: "Team leader and telecaller allocated successfully", data: result });
//   } catch (error) {
//     console.error("Error in allocating team leader and telecaller:", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// export const allocateTeamLeader = async (req, res) => {
//   try {
//     const { data, selectedTeamLeader, selectedTelecaller } = req.body;
//     const result = await Promise.all(data.map(async (item) => {
//       const allocationUpdate = {
//         selectedTeamLeader: item.selectedTeamLeader || selectedTeamLeader,
//         selectedTelecaller: selectedTelecaller || undefined,
//         Disposition: item.Disposition, // Update the disposition value
//         Sub_Disposition: item.Sub_Disposition // Update the subdisposition value
//       };
//       const updatedAllocation = await Allocation.findByIdAndUpdate(item._id, allocationUpdate, { new: true });
//       return updatedAllocation;
//     }));
//     return res.status(200).json({ success: true, message: "Team leader and telecaller allocated successfully", data: result });
//   } catch (error) {
//     console.error("Error in allocating team leader and telecaller:", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// export const allocateTeamLeader = async (req, res) => {
//   try {
//     const { data, selectedTeamLeader, selectedTelecaller } = req.body;
//     const result = await Promise.all((Array.isArray(data) ? data : [data]).map(async (item) => {
//     const allocation = await Allocation.findByIdAndUpdate(item._id,{selectedTeamLeader: item.selectedTeamLeader || selectedTeamLeader,selectedTelecaller: selectedTelecaller || undefined,Disposition: `${item.selectedDisposition} (${new Date().toISOString()})`,Sub_Disposition: `${item.selectedSubDisposition} (${new Date().toISOString()})`, },{ new: true } );
//     return allocation;
//       })
//     );
//     return res.status(200).json({ success: true, message: "Team leader and telecaller allocated successfully", data: result });
//   } catch (error) {
//     console.error("Error in allocating team leader and telecaller:", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };


// export const allocateTeamLeader = async (req, res) => {
//   try {
//     const { data, selectedTeamLeader, selectedTelecaller } = req.body;
//     const result = await Promise.all(
//       (Array.isArray(data) ? data : [data]).map(async (item) => {
//         const allocation = await Allocation.findByIdAndUpdate( item._id,
//           {
//             selectedTeamLeader: item.selectedTeamLeader || selectedTeamLeader,
//             selectedTelecaller: selectedTelecaller || undefined,
//             Disposition: `${item.selectedDisposition} (${new Date().toISOString()})`,
//             Sub_Disposition: `${item.selectedSubDisposition} (${new Date().toISOString()})`,
//             Remarks: item.Remarks, 
//           },
//           { new: true }
//         );
//         return allocation;
//       })
//     );
//     return res.status(200).json({
//       success: true,
//       message: "Team leader, telecaller, and remarks saved successfully",
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error in allocating team leader and telecaller:", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// export const allocateTeamLeader = async (req, res) => {
//   try {
//     const { data, selectedTeamLeader, selectedTelecaller } = req.body;
//     const result = await Promise.all(
//       (Array.isArray(data) ? data : [data]).map(async (item) => {
//         let productivityStatus = "";
//         switch (item.selectedDisposition) {
//           case "Submit Lead":
//             productivityStatus = "Worked Leads";
//             break;
//           case "Not Int":
//             productivityStatus = "Reached";
//             break;
//           case "Call Back":
//             productivityStatus = "Not Reached";
//             break;
//             case "DNE":
//               productivityStatus = " Reached";
//               break;
//               case "Followup":
//                 productivityStatus = " Reached";
//                 break;
//                 case "Future Followup":
//                   productivityStatus = " Reached";
//                   break;
//                   case "Lead Accepted":
//                     productivityStatus = " Lead Accepted";
//                     break;
//           default:
//             productivityStatus = "Not Updated"; // Default value if disposition doesn't match
//             break;
//         }

//         const allocation = await Allocation.findByIdAndUpdate(
//           item._id,
//           {
//             selectedTeamLeader: item.selectedTeamLeader || selectedTeamLeader,
//             selectedTelecaller: selectedTelecaller || undefined,
//             Disposition: `${item.selectedDisposition} (${new Date().toISOString()})`,
//             Sub_Disposition: `${item.selectedSubDisposition} (${new Date().toISOString()})`,
//             Remarks: item.Remarks,
//             Productivity_Status: productivityStatus, // Update Productivity_Status
//           },
//           { new: true }
//         );
//         return allocation;
//       })
//     );
//     return res.status(200).json({
//       success: true,
//       message: "Team leader, telecaller, and remarks saved successfully",
//       data: result,
//     });
//   } catch (error) {
//     console.error("Error in allocating team leader and telecaller:", error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

export const allocateTeamLeader = async (req, res) => {
  try {
    const { data, selectedTeamLeader, selectedTelecaller } = req.body;
    const result = await Promise.all(
      (Array.isArray(data) ? data : [data]).map(async (item) => {
        let productivityStatus = "";
        switch (item.selectedDisposition) {
          case "Submit Lead":
            productivityStatus = "Worked Leads";
            break;
          case "Not Int":
            productivityStatus = "Reached";
            break;
          case "Call Back":
            productivityStatus = "Not Reached";
            break;
          case "DNE":
          case "Followup":
          case "Future Followup":
            productivityStatus = "Reached";
            break;
          case "Lead Accepted":
            productivityStatus = "Lead Accepted";
            break;
          default:
            productivityStatus = "Not Updated"; // Default value if disposition doesn't match
            break;
        }

        const allocation = await Allocation.findByIdAndUpdate(
          item._id,
          {
            selectedTeamLeader: item.selectedTeamLeader || selectedTeamLeader,
            selectedTelecaller: selectedTelecaller || undefined,
            Disposition: `${item.selectedDisposition} (${new Date().toISOString()})`,
            Sub_Disposition: `${item.selectedSubDisposition} (${new Date().toISOString()})`,
            Remarks: item.Remarks,
            Productivity_Status: productivityStatus, // Update Productivity_Status
          },
          { new: true }
        );

        // Update the Status to "Allocate" if selectedTeamLeader is provided
        if (selectedTeamLeader) {
          allocation.Status = "Allocate";
          await allocation.save(); // Save the updated allocation
        }

        return allocation;
      })
    );
    return res.status(200).json({
      success: true,
      message: "Team leader, telecaller, and remarks saved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in allocating team leader and telecaller:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const deleteallallocation = async (req, res) => {
  try {
    await Allocation.deleteMany({}); 
    res.status(200).json({ success: true, message: "All allocation deleted successfully" });
  } catch (error) {
    console.error("Error in deleting allocation:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};