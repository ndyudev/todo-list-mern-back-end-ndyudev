import Task from "../model/Task.js";

export const getAllTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate = null;
  let endDate = null; // exclusive

  switch (filter) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      break;
    }
    case "week": {
      const day = now.getDay(); // 0..6 (Sun=0)
      const diffToMonday = (day + 6) % 7; // Mon=0
      startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() - diffToMonday
      );
      endDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate() + 7
      );
      break;
    }
    case "month": {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      break;
    }
    case "all":
    default: {
      startDate = null;
      endDate = null;
    }
  }

  const matchByDate =
    startDate && endDate
      ? { createdAt: { $gte: startDate, $lt: endDate } }
      : {};

  try {
    const result = await Task.aggregate([
      { $match: matchByDate },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completeCount: [
            { $match: { status: "complete" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completeCount = result[0].completeCount[0]?.count || 0;
    res.status(200).json({ tasks, activeCount, completeCount });
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
    const { title, status } = req.body;
    const update = {};
    if (title !== undefined) update.title = title;
    if (status !== undefined) {
      update.status = status;
      if (status === "complete")
        update.completedAt = req.body.completedAt ?? new Date();
      if (status === "active") update.completedAt = null;
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });
    if (!updatedTask)
      return res.status(404).json({ message: "Nhiệm vụ không tồn tại!" });
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Lỗi khi gọi updateTask", error);
    res.status(500).json({ message: "Lỗi hệ thống!" });
  }
};

export const deleteTask = async (req, res) => {
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
