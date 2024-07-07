/**
 * The `Entity` class represents a base entity with an identifier and properties.
 * It is designed to be extended by domain entities to provide common functionality such as ID generation and property management.
 * The `_id` property holds a unique identifier generated by the database (incremental).
 * The `props` property stores the entity's properties of type `T`.
 * When instantiated, the entity can be assigned a unique ID provided by the database.
 * The ID can be accessed using the `id` getter method.
 */
export abstract class Entity<T> {
  private _id: number | undefined; // Use `undefined` initially since ID will be assigned by the database.
  protected props: T;

  /**
   * Creates an instance of `Entity`.
   * @param props The properties of the entity.
   * @param id (Optional) The ID of the entity. If not provided, it will be assigned later by the database.
   */
  protected constructor(props: T, id?: number) {
    this.props = props;
    this._id = id;
  }

  /**
   * Gets the ID of the entity.
   * @returns The unique identifier of the entity.
   */
  get id() {
    return this._id;
  }

  /**
   * Sets the ID of the entity.
   * @param id The ID to set for the entity.
   */
  setId(id: number) {
    this._id = id;
  }

  // Optionally, you can implement an equality check method if needed.
  // public equals(entity: Entity<unknown>) {
  //   if (entity === this) {
  //     return true;
  //   }

  //   if (entity.id === this._id) {
  //     return true;
  //   }

  //   return false;
  // }
}
