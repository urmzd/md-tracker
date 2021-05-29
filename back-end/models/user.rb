# Generate GUIDs for unique identifiers
require 'securerandom'

class User
  def initialize(
    first_name,
    last_name,
    phone_number)

    @id = SecureRandom.uuid
    @first_name = first_name
    @last_name = last_name
    @phone_number = phone_number
    @entries = []
    @prescriptions = []
    @schedules = []
  end

  # Mutators
  def add_schedule(schedule)
    @schedules.push(schedule)
  end

  def remove_schedule(schedule)
    @schedules.delete(schedule)
  end

  def add_prescription(prescription)
    @prescriptions.push(prescription)
  end

  def remove_prescription(prescription)
    @prescriptions.remove(prescription)
  end

  def add_entry(entry)
    @entries.push(entry)
  end

  def remove_entry(entry)
    @entries.push(entry)
  end

  # Accessors
  def get_id
    return @id
  end

  def get_name
    return @first_name + " " + @last_name
  end

  def get_phone
    return @phone_number
  end

  def get_schedules
    return @schedules
  end

  def get_prescriptions
    return @prescriptions
  end

  def get_entries
    return @entries
  end
end