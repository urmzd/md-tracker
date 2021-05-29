class Prescription
  def initialize(name, dosage, description)
    @name = name
    @dosage = dosage
    @description = description
  end

  def name
    return @name
  end

  def dosage
    return @dosage
  end

  def description
    return @description
  end
end