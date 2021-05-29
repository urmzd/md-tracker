class Entry
  def initialize(symptom, severity)
    @symptom = symptom
    @severity = severity

    def symptom
      return @symptom
    end

    def severity
      return @severity
    end

    def update_severity(severity)
      @severity = severity
    end
  end
end