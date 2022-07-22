from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AccountVO, Attendee, ConferenceVO


class ConferenceVODetailEncoder(ModelEncoder):
    model = ConferenceVO
    properties = ["name", "import_href"]


class AttendeeListEncoder(ModelEncoder):
    model = Attendee
    properties = ["name"]

    def get_extra_data(self, o):
        return {"conference": o.conference.name}


class AttendeeDetailEncoder(ModelEncoder):
    model = Attendee
    properties = [
        "email",
        "name",
        "company_name",
        "created",
        "conference",
    ]
    encoders = {
        "conference": ConferenceVODetailEncoder(),
    }

    def get_extra_data(self, o):
        count = AccountVO.objects.filter(email=o.email).count()
        return {"has_account": count > 0}


@require_http_methods(["GET", "POST"])
def api_list_attendees(request, conference_vo_id=None):
    """See all attendees or create one"""
    if request.method == "GET":
        if conference_vo_id is not None:
            attendees = Attendee.objects.filter(conference=conference_vo_id)
        else:
            attendees = Attendee.objects.all()
        return JsonResponse(
            {"attendees": attendees},
            encoder=AttendeeListEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        try:
            conference_href = content["conference"]
            conference = ConferenceVO.objects.get(import_href=conference_href)
            content["conference"] = conference
        except ConferenceVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid conference id"},
                status=400,
            )
        attendee = Attendee.objects.create(**content)
        return JsonResponse(
            attendee,
            encoder=AttendeeDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_show_attendee(request, pk):
    """Show, update or delete attendee details"""
    if request.method == "GET":
        attendee = Attendee.objects.get(id=pk)
        return JsonResponse(
            attendee,
            encoder=AttendeeDetailEncoder,
            safe=False,
        )
    elif request.method == "PUT":
        content = json.loads(request.body)
        try:
            Attendee.objects.get(id=pk)
            if "conference" in content:
                conference = ConferenceVO.objects.get(id=content["conference"])
                content["conference"] = conference
        except Attendee.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid attendee"},
                status=400,
            )
        except ConferenceVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid conference"},
                status=400,
            )
        Attendee.objects.filter(id=pk).update(**content)
        attendee = Attendee.objects.get(id=pk)
        return JsonResponse(
            attendee,
            encoder=AttendeeDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Attendee.objects.filter(id=pk).delete()
        return JsonResponse(
            {"deleted": count > 0},
        )