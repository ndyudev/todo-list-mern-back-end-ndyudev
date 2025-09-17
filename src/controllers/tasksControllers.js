import Task from "../model/Task.js";

export const getAllTasks = async (req, res) => {
  try {
    // const tasks = await Task.find().sort({ createdAt: -1 }); // sort task mới hiện thị trước hoặc desc hoặc asc or 1
    // throw new Error("Lỗi bla bla");
    const resutl = await Task.aggregate([
      {
        $facet: {
          tasks: [
            {
              $sort: { createdAt: -1 },
            },
          ],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completeCount: [
            { $match: { status: "complete" } },
            { $count: "count" },
          ],
        },
      },
    ]);
    const tasks = resutl[0].tasks;
    const activeCount = resutl[0].activeCount[0]?.count || 0;
    const completeCount = resutl[0].completeCount[0]?.count || 0;
    res.status(200).json({tasks, activeCount, completeCount});
  } catch (error) {
    console.error("Lỗi khi gọi getAllTasks: ", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = new Task({ title });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Lỗi khi gọi newTask", error);
    res.status(500).json({ message: "Lỗi hệ thống! " });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body;
    const updateTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt,
      },
      { new: true }
    );
    if (!updateTask) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại!" });
    } else {
      res.status(200).json(updateTask);
    }
  } catch (error) {
    console.error("Lỗi khi gọi updateTask", error);
    res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};

export const deteleTask = async (req, res) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại" });
    }
    res.status(200).json(deleteTask);
  } catch (error) {
    console.error("Lỗi khi gọi deleteTask", error);
    res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};
