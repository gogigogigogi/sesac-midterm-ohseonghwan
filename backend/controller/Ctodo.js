const { where } = require('sequelize');
const { Todo } = require('../models/index');

/* Todos 전체 목록 불러오기 */
exports.readAll = async (req, res) => {
  try {
    const result = await Todo.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: '서버 에러(todo 조회)',
    });
  }
};

/* Todo 한 개 불러오기 */
exports.readOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.findOne({
      where: {
        id,
      },
    });

    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/* 새로운 Todo 생성 */
exports.create = async (req, res) => {
  try {
    const { title, done } = req.body;
    if (!title) {
      throw new Error('Internal Server Error');
    }
    const result = await Todo.create({
      title,
      done,
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* 기존 Todo 수정 */
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, done } = req.body;

    const findResult = await Todo.findOne({
      where: {
        id,
      },
    });

    if (!findResult) {
      return res.json({
        message: 'Todo not found',
      });
    }

    const updateResult = await Todo.update(
      {
        title,
        done,
      },
      {
        where: {
          id,
        },
      }
    );

    if (updateResult[0]) {
      const findNewResult = await Todo.findOne({
        where: {
          id,
        },
      });
      res.json(findNewResult);
    } else {
      res.json('변경될 값이 없습니다.');
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/* 기존 Todo 삭제 */
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Todo.destroy({ where: { id } });
    console.log('결과는', result);
    if (result) {
      res.json({
        message: 'Todo deleted successfully',
        deletedId: id,
      });
    } else {
      res.status(404).json({
        message: 'Todo not found',
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
