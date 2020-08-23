export default class BaseService {
  constructor(model) {
    this.model = model;
  }

  async create(entry) {
    return await this.model.create(entry);
  }

  async findOneById(id) {
    return await this.model.findByPk(id);
  }

  async find(conditions) {
    return await this.model.findAll(conditions);
  }

  async deleteOneById(id) {
    return await this.model.destroy({
      where: {
        id,
      },
    });
  }

  async updateOneById(id, partialEntry) {
    return await this.model.update(partialEntry, {
      where: {
        id,
      },
    });
  }
}
